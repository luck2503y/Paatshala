import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

interface ProseRendererProps {
  contentHtml: string;
  fontSize?: number;
}

export const ProseRenderer: React.FC<ProseRendererProps> = ({
  contentHtml,
  fontSize = 17,
}) => {
  const { theme, themeMode } = useApp();
  const isDark = themeMode === 'dark';

  // Helper to parse inline <strong>, <em>, and plain text
  const renderInlineFormattedText = (rawText: string, baseStyle: any, keyPrefix: string) => {
    // Regex matching <strong>...</strong> and <em>...</em>
    const tokens = rawText.split(/(<strong>[\s\S]*?<\/strong>|<em>[\s\S]*?<\/em>)/gi);

    return (
      <Text style={baseStyle} key={keyPrefix}>
        {tokens.map((token, idx) => {
          if (/^<strong>([\s\S]*?)<\/strong>$/i.test(token)) {
            const inner = token.replace(/<\/?strong>/gi, '');
            return (
              <Text key={`${keyPrefix}-b-${idx}`} style={{ fontWeight: '700', color: theme.textPrimary }}>
                {inner}
              </Text>
            );
          }
          if (/^<em>([\s\S]*?)<\/em>$/i.test(token)) {
            const inner = token.replace(/<\/?em>/gi, '');
            return (
              <Text key={`${keyPrefix}-i-${idx}`} style={{ fontStyle: 'italic' }}>
                {inner}
              </Text>
            );
          }
          return token;
        })}
      </Text>
    );
  };

  // Split content by major block elements: takeaway div, ul list, and p paragraphs
  const parseBlocks = () => {
    const blocks: React.ReactNode[] = [];
    let remaining = contentHtml.trim();
    let index = 0;

    while (remaining.length > 0) {
      // 1. Check for takeaway box: <div class="reading-key-takeaway">...</div>
      const takeawayMatch = remaining.match(/^<div\s+class=["']reading-key-takeaway["']>([\s\S]*?)<\/div>/i);
      if (takeawayMatch) {
        const inner = takeawayMatch[1];
        const h4Match = inner.match(/<h4>([\s\S]*?)<\/h4>/i);
        const pMatches = Array.from(inner.matchAll(/<p>([\s\S]*?)<\/p>/gi)).map(m => m[1]);

        blocks.push(
          <View
            key={`takeaway-${index++}`}
            style={[
              styles.takeawayCard,
              {
                backgroundColor: isDark ? 'rgba(79, 70, 229, 0.12)' : '#EEF2FF',
                borderColor: isDark ? 'rgba(99, 102, 241, 0.35)' : '#C7D2FE',
              },
            ]}
          >
            {h4Match && (
              <Text style={[styles.takeawayTitle, { color: theme.primary, fontSize: fontSize * 0.95 }]}>
                {h4Match[1].replace(/<[^>]+>/g, '').trim()}
              </Text>
            )}
            {pMatches.map((pText, pIdx) =>
              renderInlineFormattedText(
                pText.trim(),
                [
                  styles.takeawayBody,
                  {
                    fontSize: fontSize * 0.92,
                    lineHeight: fontSize * 1.5,
                    color: isDark ? '#E2E8F0' : '#312E81',
                  },
                ],
                `takeaway-p-${index}-${pIdx}`
              )
            )}
          </View>
        );

        remaining = remaining.substring(takeawayMatch[0].length).trim();
        continue;
      }

      // 2. Check for bullet list: <ul>...</ul>
      const ulMatch = remaining.match(/^<ul>([\s\S]*?)<\/ul>/i);
      if (ulMatch) {
        const liMatches = Array.from(ulMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)).map(m => m[1]);

        blocks.push(
          <View key={`list-${index++}`} style={styles.listContainer}>
            {liMatches.map((liText, liIdx) => (
              <View key={`li-${index}-${liIdx}`} style={styles.liRow}>
                <View style={[styles.bulletDot, { backgroundColor: theme.primary }]} />
                <View style={styles.liContent}>
                  {renderInlineFormattedText(
                    liText.trim(),
                    [
                      styles.paragraphText,
                      {
                        fontSize,
                        lineHeight: fontSize * 1.58,
                        color: theme.textPrimary,
                      },
                    ],
                    `li-text-${index}-${liIdx}`
                  )}
                </View>
              </View>
            ))}
          </View>
        );

        remaining = remaining.substring(ulMatch[0].length).trim();
        continue;
      }

      // 3. Check for paragraph: <p>...</p>
      const pMatch = remaining.match(/^<p>([\s\S]*?)<\/p>/i);
      if (pMatch) {
        blocks.push(
          <View key={`p-${index++}`} style={styles.paragraphWrap}>
            {renderInlineFormattedText(
              pMatch[1].trim(),
              [
                styles.paragraphText,
                {
                  fontSize,
                  lineHeight: fontSize * 1.62,
                  color: theme.textPrimary,
                },
              ],
              `p-text-${index}`
            )}
          </View>
        );

        remaining = remaining.substring(pMatch[0].length).trim();
        continue;
      }

      // 4. Fallback for any stray text or untagged line
      const nextTagIndex = remaining.indexOf('<', 1);
      const chunk = nextTagIndex === -1 ? remaining : remaining.substring(0, nextTagIndex);
      const cleanChunk = chunk.replace(/<[^>]+>/g, '').trim();

      if (cleanChunk) {
        blocks.push(
          <View key={`raw-${index++}`} style={styles.paragraphWrap}>
            <Text
              style={[
                styles.paragraphText,
                {
                  fontSize,
                  lineHeight: fontSize * 1.62,
                  color: theme.textPrimary,
                },
              ]}
            >
              {cleanChunk}
            </Text>
          </View>
        );
      }

      if (nextTagIndex === -1) break;
      remaining = remaining.substring(nextTagIndex).trim();
    }

    return blocks;
  };

  return <View style={styles.container}>{parseBlocks()}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  paragraphWrap: {
    marginBottom: 16,
  },
  paragraphText: {
    letterSpacing: 0.15,
  },
  takeawayCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    marginVertical: 18,
  },
  takeawayTitle: {
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  takeawayBody: {
    fontWeight: '500',
  },
  listContainer: {
    marginVertical: 8,
    marginBottom: 16,
  },
  liRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 10,
    marginRight: 10,
  },
  liContent: {
    flex: 1,
  },
});
