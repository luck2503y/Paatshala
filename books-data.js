/**
 * Paatshala - Indian Educational Storybooks & Chapters Data
 * Fictional educational stories inspired by Indian Government initiatives and national development.
 */

const BOOKS_DATA = [
  {
    id: "constitution-of-india",
    title: "The Constitution of India",
    subtitle: "The Story of Our Republic",
    category: "Democracy & Law",
    readTime: "7 min read",
    themeColor: "#1e3a8a",
    accentColor: "#fbbf24",
    shortDescription: "Discover how the visionary leaders of India drafted the world's longest written constitution to unite a diverse nation in justice, liberty, and equality.",
    coverBadge: "Civic Heritage",
    coverIllustration: `
      <svg viewBox="0 0 300 420" class="book-cover-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cov-grad-1" x1="0" y1="0" x2="300" y2="420" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0f172a"/>
            <stop offset="0.5" stop-color="#1e3a8a"/>
            <stop offset="1" stop-color="#172554"/>
          </linearGradient>
          <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="50%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>
        <rect width="300" height="420" rx="16" fill="url(#cov-grad-1)"/>
        <!-- Golden Border Frame -->
        <rect x="14" y="14" width="272" height="392" rx="12" fill="none" stroke="url(#gold-grad)" stroke-width="2.5" stroke-dasharray="8 4"/>
        <rect x="22" y="22" width="256" height="376" rx="8" fill="none" stroke="url(#gold-grad)" stroke-width="1" opacity="0.6"/>
        <!-- Emblem Center / Dharma Chakra Accent -->
        <circle cx="150" cy="180" r="64" fill="none" stroke="url(#gold-grad)" stroke-width="2" opacity="0.4"/>
        <circle cx="150" cy="180" r="50" fill="none" stroke="url(#gold-grad)" stroke-width="3"/>
        <circle cx="150" cy="180" r="8" fill="url(#gold-grad)"/>
        <!-- 24 Spokes -->
        <g stroke="url(#gold-grad)" stroke-width="1.8" opacity="0.8">
          <line x1="150" y1="130" x2="150" y2="230"/>
          <line x1="100" y1="180" x2="200" y2="180"/>
          <line x1="115" y1="145" x2="185" y2="215"/>
          <line x1="115" y1="215" x2="185" y2="145"/>
          <line x1="131" y1="134" x2="169" y2="226"/>
          <line x1="169" y1="134" x2="131" y2="226"/>
          <line x1="104" y1="161" x2="196" y2="199"/>
          <line x1="104" y1="199" x2="196" y2="161"/>
        </g>
        <!-- Top Banner -->
        <text x="150" y="65" fill="#fef08a" font-family="'Plus Jakarta Sans', serif" font-size="12" font-weight="700" letter-spacing="4" text-anchor="middle">REPUBLIC OF INDIA</text>
        <line x1="80" y1="78" x2="220" y2="78" stroke="url(#gold-grad)" stroke-width="1.5"/>
        <!-- Book Title Art -->
        <text x="150" y="290" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800" text-anchor="middle">THE CONSTITUTION</text>
        <text x="150" y="315" fill="#fef08a" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" text-anchor="middle">OF INDIA</text>
        <text x="150" y="345" fill="#93c5fd" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="500" letter-spacing="1" text-anchor="middle">STORY OF OUR REPUBLIC</text>
        <text x="150" y="380" fill="#cbd5e1" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle">Paatshala Heritage Series</text>
      </svg>
    `,
    overview: "This story explores how the founding fathers and mothers of independent India came together to craft the Constitution. It introduces students to the Preamble, Fundamental Rights, and the responsibilities of every citizen.",
    chapters: [
      {
        number: 1,
        title: "The Great Gathering in New Delhi",
        content: `
          <p>On a brisk December morning in 1946, the Constitution Hall in New Delhi was filled with an unprecedented sense of destiny. Men and women from every province, community, and language had gathered under one roof. They held divergent viewpoints, yet they shared a singular, steadfast commitment: to create a sovereign democratic republic that would protect every Indian citizen with justice and dignity.</p>
          <p>Dr. B.R. Ambedkar, chosen as the Chairman of the Drafting Committee, stood before the assembly with stacks of references from world democracies. He reminded the delegates that independence was not merely the transfer of power; it was the birth of constitutional morality. Every village child, farmer, teacher, and factory worker must be guaranteed the right to live freely without fear.</p>
          <p>For nearly three continuous years—specifically 2 years, 11 months, and 18 days—the assembly debated fiercely yet respectfully. Every phrase of every article was scrutinized, ensuring that liberty of thought, equality of status, and fraternity were firmly anchored as the bedrocks of the newly born republic.</p>
        `
      },
      {
        number: 2,
        title: "The Soul of the Book: The Preamble",
        content: `
          <p>When the assembly finally adopted the Constitution on 26th November 1949, they began with words that echoed across the globe: <em>"We, the People of India..."</em>. These words established that the ultimate authority in India rested not with monarchs, monarchs' courts, or foreign empires, but directly in the hands of its citizens.</p>
          <p>The Preamble promised four pillars:</p>
          <ul>
            <li><strong>Justice:</strong> Social, economic, and political, ensuring that fairness guides every court and policymaker.</li>
            <li><strong>Liberty:</strong> Of thought, expression, belief, faith, and worship, allowing India's vibrant tapestry of cultures to flourish.</li>
            <li><strong>Equality:</strong> Of status and of opportunity, tearing down the ancient walls of caste, creed, and gender discrimination.</li>
            <li><strong>Fraternity:</strong> Assuring the dignity of the individual and the unity and integrity of the nation.</li>
          </ul>
          <p>Prem Behari Narain Raizada patiently handwritten the entire manuscript in flowing calligraphy, while the legendary artist Nandalal Bose and his pupils from Shantiniketan illustrated the borders with scenes from ancient Indian history, the Ramayana, Mahabharata, and the Buddha.</p>
        `
      },
      {
        number: 3,
        title: "A Living Document for Young Citizens",
        content: `
          <p>On 26th January 1950, as the Constitution came into effect, India celebrated its very first Republic Day. But the Constitution was never intended to be an ancient, dusty book kept locked behind glass. The makers deliberately crafted mechanisms for amendments so it could grow alongside a modernizing society.</p>
          <p>Today, for every student in a Paatshala classroom, the Constitution is an active shield and compass. It guarantees the Fundamental Right to Education under Article 21A, guards freedom of speech, and asks every citizen in return to fulfill their Fundamental Duties: to cherish our composite culture, preserve the natural environment, and cultivate a scientific temper.</p>
          <div class="reading-key-takeaway">
            <h4>💡 Educational Takeaway</h4>
            <p>Democracy thrives when citizens know their constitutional rights and fulfill their civic duties. The Constitution is the living bond that keeps India united and progressive.</p>
          </div>
        `
      }
    ]
  },
  {
    id: "the-village-that-voted",
    title: "The Village That Voted",
    subtitle: "A Story of Democracy",
    category: "Democracy & Law",
    readTime: "6 min read",
    themeColor: "#c2410c",
    accentColor: "#fb923c",
    shortDescription: "Follow young Meera and the residents of Shantinagar as they prepare for election day and discover the real power of every single ballot.",
    coverBadge: "Civic Participation",
    coverIllustration: `
      <svg viewBox="0 0 300 420" class="book-cover-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cov-grad-2" x1="0" y1="0" x2="300" y2="420" gradientUnits="userSpaceOnUse">
            <stop stop-color="#431407"/>
            <stop offset="0.5" stop-color="#c2410c"/>
            <stop offset="1" stop-color="#7c2d12"/>
          </linearGradient>
        </defs>
        <rect width="300" height="420" rx="16" fill="url(#cov-grad-2)"/>
        <!-- Background Decorative Rays -->
        <circle cx="150" cy="190" r="110" fill="#ea580c" opacity="0.25"/>
        <circle cx="150" cy="190" r="85" fill="#f97316" opacity="0.3"/>
        <!-- Ballot Box Art -->
        <rect x="90" y="140" width="120" height="95" rx="8" fill="#ffffff" stroke="#fed7aa" stroke-width="3"/>
        <rect x="110" y="125" width="80" height="18" rx="4" fill="#fdba74"/>
        <line x1="125" y1="134" x2="175" y2="134" stroke="#7c2d12" stroke-width="3" stroke-linecap="round"/>
        <!-- Inked Finger Icon -->
        <circle cx="150" cy="180" r="22" fill="#ffedd5"/>
        <path d="M142 165 C142 155 158 155 158 165 L158 190 C158 198 142 198 142 190 Z" fill="#9a3412"/>
        <line x1="150" y1="156" x2="150" y2="172" stroke="#1e3a8a" stroke-width="4" stroke-linecap="round"/>
        <!-- Header -->
        <text x="150" y="60" fill="#fdba74" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="3" text-anchor="middle">VOICE OF THE PEOPLE</text>
        <text x="150" y="285" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="17" font-weight="800" text-anchor="middle">THE VILLAGE THAT</text>
        <text x="150" y="310" fill="#fed7aa" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" text-anchor="middle">VOTED</text>
        <text x="150" y="340" fill="#ffedd5" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="500" letter-spacing="1" text-anchor="middle">A STORY OF DEMOCRACY</text>
        <text x="150" y="380" fill="#fed7aa" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle">Paatshala Citizen Series</text>
      </svg>
    `,
    overview: "This story brings the festival of elections to life through the eyes of a village. It highlights the role of the Election Commission, the indelible ink mark, and how informed voting empowers communities.",
    chapters: [
      {
        number: 1,
        title: "The Yellow Envelopes of Shantinagar",
        content: `
          <p>Twelve-year-old Meera stood beside the ancient banyan tree in Shantinagar as the election officials arrived in a sturdy white jeep. They carried large metal trunks, sealed green boxes, and the iconic Electronic Voting Machines (EVMs). For weeks, the town had buzzed with candidate rallies, debate circles at the tea stall, and campaign posters pasted across community boards.</p>
          <p>Meera’s grandfather, Dada Kashi, who had voted in every general election since 1952, polished his spectacles. "Tomorrow is not an ordinary day, Meera," he said with pride. "Tomorrow, the prime minister, the billionaire, the farmer, and the daily wage laborer all become equal. Every one of us has exactly one vote, and each vote carries equal weight."</p>
        `
      },
      {
        number: 2,
        title: "The Festival of the Inked Finger",
        content: `
          <p>By sunrise, a queue had formed outside the primary school voting center. Women in colorful sarees, elderly citizens on walking sticks, and first-time university voters held their Voter ID cards high. The polling officers checked names against the electoral roll with utmost transparency.</p>
          <p>Meera watched in fascination through the classroom window as each voter approached the polling table. The presiding officer placed a careful purple line of indelible silver-nitrate ink on the left index finger. That small purple mark was a badge of honour—proof that a citizen had participated in shaping the destiny of the world's largest democracy.</p>
          <p>Inside the voting booth, behind a discreet cardboard shield, a soft beep sounded each time a citizen pressed the blue button next to their chosen candidate. In total secrecy, without intimidation or bribe, the collective voice of Shantinagar was recorded.</p>
        `
      },
      {
        number: 3,
        title: "Building the Village Together",
        content: `
          <p>When the results were announced two days later at the counting center, there were celebrations, but more importantly, a shared recognition of duty. The newly elected representative immediately held a gram sabha meeting in the village square.</p>
          <p>Dada Kashi stepped forward. "We have voted you into office, but our civic duty does not end with the ballot box. We will work with you to repair the canal, upgrade the solar lights, and ensure our school library gets new science books."</p>
          <p>Meera smiled and looked at her own thumb, eager for the day she would turn eighteen and earn her own indelible purple mark. She knew that democracy was not just a spectator sport; it was a daily promise to participate, question, and care for one’s nation.</p>
          <div class="reading-key-takeaway">
            <h4>💡 Educational Takeaway</h4>
            <p>Every vote is sacred in a democracy. Universal adult suffrage guarantees equality, and active citizen participation keeps local and national governance accountable.</p>
          </div>
        `
      }
    ]
  },
  {
    id: "the-river-guardians",
    title: "The River Guardians",
    subtitle: "A Mission to Save the Ganga",
    category: "Environment",
    readTime: "7 min read",
    themeColor: "#0284c7",
    accentColor: "#38bdf8",
    shortDescription: "Join a dedicated team of school students as they launch a community river-cleaning initiative inspired by the Namami Gange mission.",
    coverBadge: "Environmental Mission",
    coverIllustration: `
      <svg viewBox="0 0 300 420" class="book-cover-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cov-grad-3" x1="0" y1="0" x2="300" y2="420" gradientUnits="userSpaceOnUse">
            <stop stop-color="#082f49"/>
            <stop offset="0.5" stop-color="#0284c7"/>
            <stop offset="1" stop-color="#0369a1"/>
          </linearGradient>
        </defs>
        <rect width="300" height="420" rx="16" fill="url(#cov-grad-3)"/>
        <!-- River Waves -->
        <path d="M0 160 Q75 140 150 160 T300 160 L300 280 L0 280 Z" fill="#38bdf8" opacity="0.3"/>
        <path d="M0 190 Q75 170 150 190 T300 190 L300 280 L0 280 Z" fill="#0284c7" opacity="0.4"/>
        <path d="M0 220 Q75 200 150 220 T300 220 L300 280 L0 280 Z" fill="#0369a1" opacity="0.6"/>
        <!-- Lotus Emblem -->
        <circle cx="150" cy="150" r="36" fill="#f0f9ff"/>
        <path d="M150 125 C140 140 135 155 150 165 C165 155 160 140 150 125 Z" fill="#0284c7"/>
        <path d="M130 145 C125 155 135 165 150 165 C145 152 138 146 130 145 Z" fill="#0ea5e9"/>
        <path d="M170 145 C175 155 165 165 150 165 C155 152 162 146 170 145 Z" fill="#0ea5e9"/>
        <!-- Header & Titles -->
        <text x="150" y="60" fill="#bae6fd" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="3" text-anchor="middle">NAMAMI GANGE INITIATIVE</text>
        <text x="150" y="295" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="19" font-weight="800" text-anchor="middle">THE RIVER GUARDIANS</text>
        <text x="150" y="325" fill="#e0f2fe" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" letter-spacing="1" text-anchor="middle">A MISSION TO SAVE THE GANGA</text>
        <text x="150" y="380" fill="#bae6fd" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle">Paatshala Eco Series</text>
      </svg>
    `,
    overview: "This story educates young readers about river ecology, sewage treatment, waste segregation, and community stewardship modeled after India's National Clean Ganga Mission.",
    chapters: [
      {
        number: 1,
        title: "Tears of the Sacred Stream",
        content: `
          <p>Aryan and his school nature club took their notebooks down to the ghats of the river Ganga near Rishikesh. While the upper reaches of the river tumbled down from the Himalayas crystal-clear and freezing cold, downstream sections near towns faced immense strain from plastic waste, untreated domestic drainage, and industrial effluents.</p>
          <p>Their science teacher, Mrs. Anjali, pointed to the water testing kit. "Rivers are the lifelines of India's civilization. Over forty percent of our nation's population depends on the Ganga basin for drinking water, agriculture, and livelihood. If we poison our rivers, we poison our own future."</p>
          <p>The students tested the water samples and found high turbidity and falling dissolved oxygen levels. The Gangetic dolphin—India's national aquatic animal—was retreating to fewer pockets. Aryan resolved that his school would not remain passive observers.</p>
        `
      },
      {
        number: 2,
        title: "The Ghat Cleaning Crusade",
        content: `
          <p>Partnering with the local municipal board and the Namami Gange youth volunteer wing, Aryan’s team formed 'The River Guardians'. They designed a three-pronged campaign: bio-waste composters, ghat trash bins, and public education booths.</p>
          <p>Every Saturday morning, dozens of students in bright green aprons collected discarded plastic bottles, polythene bags, and synthetic flowers before they could reach the water current. They engaged with pilgrims and shopkeepers, explaining how natural clay idols and organic offerings prevent chemical pollution.</p>
          <p>Simultaneously, the local government inaugurated a modern Sewage Treatment Plant (STP) equipped with automated bio-filters. Aryan's class was invited to tour the plant, learning firsthand how wastewater can be recycled safely before entering the river ecosystem.</p>
        `
      },
      {
        number: 3,
        title: "When the River Sings Again",
        content: `
          <p>Within a year of dedicated community vigilance, the riverbank transformed. Native peepal, neem, and arjun saplings planted along the river buffer held the topsoil firm against monsoon erosion. The ghats sparkled under the morning sun, free from single-use plastics.</p>
          <p>One cool November morning, during their monthly biodiversity census, Aryan and his classmates paused on the wooden boat. Just thirty meters ahead, a sleek grey Gangetic dolphin surfaced, arched gracefully, and splashed back into the emerald currents.</p>
          <p>The river was healing because the people had chosen to be its guardians. It was proof that when government infrastructure merges with youth passion, natural wonders can be preserved for generations to come.</p>
          <div class="reading-key-takeaway">
            <h4>💡 Educational Takeaway</h4>
            <p>Water conservation begins at our doorsteps. Reducing plastic waste, protecting river basins, and treating sewage are vital steps in sustainable national development.</p>
          </div>
        `
      }
    ]
  },
  {
    id: "a-nation-of-scientists",
    title: "A Nation of Scientists",
    subtitle: "Dreams, Discovery and ISRO",
    category: "Science & Space",
    readTime: "8 min read",
    themeColor: "#312e81",
    accentColor: "#818cf8",
    shortDescription: "The inspiring journey of India's space program—from carrying rocket cones on bicycles in Thumba to landing Chandrayaan near the lunar south pole.",
    coverBadge: "Space Exploration",
    coverIllustration: `
      <svg viewBox="0 0 300 420" class="book-cover-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cov-grad-4" x1="0" y1="0" x2="300" y2="420" gradientUnits="userSpaceOnUse">
            <stop stop-color="#030712"/>
            <stop offset="0.5" stop-color="#1e1b4b"/>
            <stop offset="1" stop-color="#312e81"/>
          </linearGradient>
        </defs>
        <rect width="300" height="420" rx="16" fill="url(#cov-grad-4)"/>
        <!-- Star Field -->
        <circle cx="45" cy="80" r="1.5" fill="#ffffff" opacity="0.8"/>
        <circle cx="260" cy="110" r="1.2" fill="#ffffff" opacity="0.7"/>
        <circle cx="90" cy="140" r="1.8" fill="#ffffff" opacity="0.9"/>
        <circle cx="230" cy="180" r="1.5" fill="#ffffff" opacity="0.6"/>
        <circle cx="60" cy="230" r="1" fill="#ffffff" opacity="0.5"/>
        <!-- Moon Surface & Lander -->
        <circle cx="150" cy="170" r="56" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
        <!-- Craters -->
        <circle cx="130" cy="155" r="9" fill="#cbd5e1"/>
        <circle cx="170" cy="180" r="14" fill="#cbd5e1"/>
        <circle cx="145" cy="190" r="7" fill="#cbd5e1"/>
        <!-- Lander Orbit Path -->
        <ellipse cx="150" cy="170" rx="90" ry="32" fill="none" stroke="#818cf8" stroke-width="2" stroke-dasharray="6 4"/>
        <polygon points="220,165 230,170 220,175" fill="#818cf8"/>
        <!-- Header & Titles -->
        <text x="150" y="60" fill="#c7d2fe" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="3" text-anchor="middle">CHANDRAYAAN CHRONICLES</text>
        <text x="150" y="295" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800" text-anchor="middle">A NATION OF SCIENTISTS</text>
        <text x="150" y="325" fill="#a5b4fc" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" letter-spacing="1" text-anchor="middle">DREAMS, DISCOVERY AND ISRO</text>
        <text x="150" y="380" fill="#c7d2fe" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle">Paatshala STEM Series</text>
      </svg>
    `,
    overview: "This story chronicles the courage and frugal innovation of ISRO scientists, tracing the arc from Dr. Vikram Sarabhai's small church laboratory to Chandrayaan-3 and the Aditya-L1 solar mission.",
    chapters: [
      {
        number: 1,
        title: "The Church in Thumba",
        content: `
          <p>In the early 1960s, along the coconut groves of Thumba in Kerala, a tiny team of Indian engineers led by Dr. Vikram Sarabhai and a young Dr. APJ Abdul Kalam had a dream. They had no lavish aerospace factories or supercomputers. Their first sounding rocket's nose cone was transported to the launch pad on the back of a simple bicycle!</p>
          <p>Many foreign observers doubted that a young developing nation, struggling with food security and poverty, should invest in space. But Dr. Sarabhai’s answer was resolute: "We must be second to none in the application of advanced technologies to the real problems of man and society."</p>
          <p>From weather forecasting for fishermen to satellite-based educational broadcasts for village schools (the SITE program), ISRO never saw space as an arena for military vanity—it was a tool for human upliftment.</p>
        `
      },
      {
        number: 2,
        title: "The Fifteen Minutes of Terror",
        content: `
          <p>Fast forward to August 23, 2023. Inside the ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru, hundreds of scientists sat glued to mission screens. Four hundred thousand kilometers away, the Chandrayaan-3 lander was beginning its perilous automated descent towards the rugged, crater-filled south pole of the Moon.</p>
          <p>The mission controllers—among them dozens of brilliant women scientists who had led trajectory modeling and navigation systems—held their breath during the "fifteen minutes of terror". Every thruster fired with pinpoint algorithmic precision. Frugal engineering had produced a lunar mission at a fraction of Hollywood movie budgets.</p>
          <p>Suddenly, the telemetry screen flashed bright green: <em>"Lander has touched down safely!"</em> India had become the first nation in human history to land near the lunar south pole. The rover, Pragyan, rolled out onto the ancient soil, leaving the impressions of the Ashoka Emblem and the ISRO logo on the Moon.</p>
        `
      },
      {
        number: 3,
        title: "The Laboratory of Tomorrow",
        content: `
          <p>The victory was celebrated not just in scientific laboratories, but in millions of schools across India. In Paatshala classrooms, children built water rockets, coded orbital simulations, and asked bold questions about astrophysics and planetary geology.</p>
          <p>Science in India was no longer an imported dream; it was an indigenous, thriving reality. With missions to the Sun (Aditya-L1), the upcoming human spaceflight (Gaganyaan), and deep-sea exploration, India proved that dedication, self-belief, and scientific temper can breach any frontier in the universe.</p>
          <div class="reading-key-takeaway">
            <h4>💡 Educational Takeaway</h4>
            <p>Ingenuity and determination overcome resource constraints. Cultivating curiosity and scientific temper empowers students to solve real-world challenges.</p>
          </div>
        `
      }
    ]
  },
  {
    id: "the-right-to-learn",
    title: "The Right to Learn",
    subtitle: "A School for Everyone",
    category: "Education",
    readTime: "6 min read",
    themeColor: "#b45309",
    accentColor: "#fde047",
    shortDescription: "How a remote hamlet transformed its community school under the Right to Education act, empowering young girls and boys to dream big.",
    coverBadge: "Inclusive Education",
    coverIllustration: `
      <svg viewBox="0 0 300 420" class="book-cover-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cov-grad-5" x1="0" y1="0" x2="300" y2="420" gradientUnits="userSpaceOnUse">
            <stop stop-color="#451a03"/>
            <stop offset="0.5" stop-color="#b45309"/>
            <stop offset="1" stop-color="#78350f"/>
          </linearGradient>
        </defs>
        <rect width="300" height="420" rx="16" fill="url(#cov-grad-5)"/>
        <!-- Open Book & Sunrays -->
        <circle cx="150" cy="180" r="70" fill="#fde047" opacity="0.2"/>
        <path d="M150 140 C110 130 90 150 70 160 L70 220 C90 210 110 200 150 205 C190 200 210 210 230 220 L230 160 C210 150 190 130 150 140 Z" fill="#ffffff" stroke="#fef08a" stroke-width="2"/>
        <line x1="150" y1="140" x2="150" y2="205" stroke="#b45309" stroke-width="2.5"/>
        <!-- Pencil Spark -->
        <polygon points="150,110 156,128 144,128" fill="#fef08a"/>
        <circle cx="150" cy="100" r="5" fill="#fde047"/>
        <!-- Header & Titles -->
        <text x="150" y="60" fill="#fde047" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="3" text-anchor="middle">SARVA SHIKSHA ABHIYAN</text>
        <text x="150" y="295" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="19" font-weight="800" text-anchor="middle">THE RIGHT TO LEARN</text>
        <text x="150" y="325" fill="#fde047" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" letter-spacing="1" text-anchor="middle">A SCHOOL FOR EVERYONE</text>
        <text x="150" y="380" fill="#fef08a" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle">Paatshala Education Series</text>
      </svg>
    `,
    overview: "This story highlights the constitutional guarantee of education for every child between the ages of 6 and 14, showcasing how schools foster gender equality and social mobility.",
    chapters: [
      {
        number: 1,
        title: "Kavita’s Secret Notebook",
        content: `
          <p>In the small village of Chandrapur, ten-year-old Kavita used to watch children walk to school while she assisted her family with livestock grazing and weaving. She cherished a battered notebook in which she carefully copied letters and numerals using discarded chalk pieces.</p>
          <p>Her grandmother had never stepped inside a classroom. "In our times, girls were taught household chores, Kavita. School was considered a luxury for town boys," she would say gently. But Kavita had heard about Article 21A of the Indian Constitution: the Right to Free and Compulsory Education (RTE).</p>
        `
      },
      {
        number: 2,
        title: "The New Teacher Arrives",
        content: `
          <p>Everything changed when a dynamic young teacher, Master Raghav, was posted to the Chandrapur Primary School. Armed with government grant allocations under the Sarva Shiksha Abhiyan, he spearheaded a complete overhaul of the dilapidated school building.</p>
          <p>New solar-powered smart class screens were installed, clean drinking water filters were set up, and dedicated restrooms for girls were built. Master Raghav walked door-to-door, meeting parents, showing them that nutritious midday meals, textbooks, and school uniforms were provided completely free of charge.</p>
          <p>He sat with Kavita’s parents. "Educating a girl educates an entire generation," he explained. "Kavita has an extraordinarily sharp mind for mathematics. If we give her a desk today, she will uplift this entire village tomorrow." Her parents, touched by his sincerity, enrolled her that very afternoon.</p>
        `
      },
      {
        number: 3,
        title: "Wings to Soar",
        content: `
          <p>Kavita’s progress was astonishing. Within two years, she was topping regional science exhibitions and mentoring younger classmates in coding basics on the school's newly arrived tablets.</p>
          <p>On Independence Day, Kavita was selected to deliver the student speech before the entire village panchayat. Standing confidently before the tricolor flag, she spoke clearly: "A school is not just a building of brick and mortar; it is a gateway to dignity. Today, every daughter and son of India has the sacred right to learn."</p>
          <div class="reading-key-takeaway">
            <h4>💡 Educational Takeaway</h4>
            <p>Education is a fundamental human right. Equal access to learning empowers girls, eliminates generational poverty, and strengthens the democratic fabric of our country.</p>
          </div>
        `
      }
    ]
  },
  {
    id: "the-green-promise",
    title: "The Green Promise",
    subtitle: "India's Journey Towards Clean Energy",
    category: "Environment",
    readTime: "7 min read",
    themeColor: "#047857",
    accentColor: "#34d399",
    shortDescription: "Across the sunny expanses of Rajasthan and Gujarat, discover how mega solar parks and wind farms are powering a clean, sustainable future.",
    coverBadge: "Renewable Energy",
    coverIllustration: `
      <svg viewBox="0 0 300 420" class="book-cover-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cov-grad-6" x1="0" y1="0" x2="300" y2="420" gradientUnits="userSpaceOnUse">
            <stop stop-color="#022c22"/>
            <stop offset="0.5" stop-color="#047857"/>
            <stop offset="1" stop-color="#064e3b"/>
          </linearGradient>
        </defs>
        <rect width="300" height="420" rx="16" fill="url(#cov-grad-6)"/>
        <!-- Radiant Sun & Solar Grid -->
        <circle cx="150" cy="140" r="44" fill="#fef08a" opacity="0.9"/>
        <circle cx="150" cy="140" r="62" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="6 4" opacity="0.5"/>
        <!-- Solar Panels Perspective -->
        <polygon points="70,220 120,185 180,185 140,220" fill="#0f766e" stroke="#5eead4" stroke-width="1.5"/>
        <polygon points="150,220 190,185 240,185 210,220" fill="#0f766e" stroke="#5eead4" stroke-width="1.5"/>
        <!-- Wind Turbines -->
        <line x1="230" y1="130" x2="230" y2="185" stroke="#ffffff" stroke-width="2.5"/>
        <circle cx="230" cy="130" r="3" fill="#ffffff"/>
        <!-- Header & Titles -->
        <text x="150" y="60" fill="#a7f3d0" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="3" text-anchor="middle">NATIONAL SOLAR MISSION</text>
        <text x="150" y="295" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="19" font-weight="800" text-anchor="middle">THE GREEN PROMISE</text>
        <text x="150" y="325" fill="#6ee7b7" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" letter-spacing="1" text-anchor="middle">INDIA'S CLEAN ENERGY PATH</text>
        <text x="150" y="380" fill="#a7f3d0" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle">Paatshala Green Series</text>
      </svg>
    `,
    overview: "This story explores India's green transition—from rooftop solar arrays to the International Solar Alliance—teaching students about climate action and green jobs.",
    chapters: [
      {
        number: 1,
        title: "The Sea of Glass in Bhadla",
        content: `
          <p>Rohan looked out across the Thar Desert of Rajasthan, where the horizon shimmered not with water, but with millions of dark blue photovoltaic solar panels. This was the Bhadla Solar Park, one of the largest solar installations on planet Earth, spanning thousands of acres of once-barren desert land.</p>
          <p>His aunt, an electrical engineer at the grid substation, pointed out the solar tracking mechanisms. "For generations, the scorching desert sun was seen as a harsh adversary. Today, through modern science, that same sunlight produces over two thousand megawatts of zero-emission electricity every single day."</p>
        `
      },
      {
        number: 2,
        title: "From Rooftops to Railways",
        content: `
          <p>The green transition was not confined to mega-projects in deserts. In towns and rural clusters, rooftop solar schemes like the PM Surya Ghar Muft Bijli Yojana were turning homes, hospitals, and schools into self-sustaining power stations.</p>
          <p>Indian Railways—the world's fourth largest rail network—was electrifying tracks at record speed, powering stations with solar canopies and replacing diesel locomotives. In coastal Tamil Nadu and Gujarat, colossal offshore wind turbines spun smoothly against maritime breezes, feeding the national power grid day and night.</p>
        `
      },
      {
        number: 3,
        title: "The Pledge for 2070",
        content: `
          <p>At the international climate summit, India had launched the International Solar Alliance (ISA), uniting tropical nations under the motto: <em>"One Sun, One World, One Grid"</em>. The goal: achieving net-zero emissions by 2070 while bringing clean energy access to every citizen.</p>
          <p>Back in his school, Rohan helped set up an energy audit team. They replaced incandescent bulbs with efficient LEDs, ensured lights were switched off during breaks, and planted native trees around the sports ground. He realized that a greener nation is created not just by giant solar parks, but by the daily mindful choices of every student.</p>
          <div class="reading-key-takeaway">
            <h4>💡 Educational Takeaway</h4>
            <p>Renewable solar and wind energy combat global climate change while powering economic self-reliance. Energy conservation is a collective duty of all citizens.</p>
          </div>
        `
      }
    ]
  },
  {
    id: "the-power-of-unity",
    title: "The Power of Unity",
    subtitle: "India's Journey of National Development",
    category: "Science & Space",
    readTime: "8 min read",
    themeColor: "#4c1d95",
    accentColor: "#c084fc",
    shortDescription: "Witness how digital infrastructure, high-speed rail, highways, and community self-reliance (Atmanirbhar Bharat) unite the nation.",
    coverBadge: "National Development",
    coverIllustration: `
      <svg viewBox="0 0 300 420" class="book-cover-art" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cov-grad-7" x1="0" y1="0" x2="300" y2="420" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1e1035"/>
            <stop offset="0.5" stop-color="#4c1d95"/>
            <stop offset="1" stop-color="#3b0764"/>
          </linearGradient>
        </defs>
        <rect width="300" height="420" rx="16" fill="url(#cov-grad-7)"/>
        <!-- Digital Network Grid & Bridge -->
        <circle cx="150" cy="160" r="70" fill="none" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.4"/>
        <circle cx="150" cy="160" r="45" fill="none" stroke="#e9d5ff" stroke-width="2"/>
        <circle cx="150" cy="160" r="12" fill="#c084fc"/>
        <!-- Network Nodes -->
        <circle cx="100" cy="130" r="6" fill="#f43f5e"/>
        <circle cx="200" cy="130" r="6" fill="#10b981"/>
        <circle cx="100" cy="190" r="6" fill="#f59e0b"/>
        <circle cx="200" cy="190" r="6" fill="#38bdf8"/>
        <line x1="100" y1="130" x2="150" y2="160" stroke="#e9d5ff" stroke-width="1.5"/>
        <line x1="200" y1="130" x2="150" y2="160" stroke="#e9d5ff" stroke-width="1.5"/>
        <line x1="100" y1="190" x2="150" y2="160" stroke="#e9d5ff" stroke-width="1.5"/>
        <line x1="200" y1="190" x2="150" y2="160" stroke="#e9d5ff" stroke-width="1.5"/>
        <!-- Header & Titles -->
        <text x="150" y="60" fill="#e9d5ff" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="3" text-anchor="middle">DIGITAL INDIA & PROGRESS</text>
        <text x="150" y="295" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="19" font-weight="800" text-anchor="middle">THE POWER OF UNITY</text>
        <text x="150" y="325" fill="#d8b4fe" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="600" letter-spacing="1" text-anchor="middle">STORY OF MODERN PROGRESS</text>
        <text x="150" y="380" fill="#e9d5ff" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" text-anchor="middle">Paatshala Unity Series</text>
      </svg>
    `,
    overview: "This story explores how digital public infrastructure (UPI, optical fiber, telemedicine) and physical connectivity (highways, Vande Bharat trains) bridge regional gaps and empower all citizens.",
    chapters: [
      {
        number: 1,
        title: "The Fiber Optic Trail to the Hills",
        content: `
          <p>High in the cloud-kissed hills of Himachal Pradesh, young Tsering used to travel two hours by mountain bus just to access a bank branch or purchase medicines for her grandmother. In winter snowstorms, entire valleys felt cut off from the rest of the nation.</p>
          <p>That began to change when the BharatNet optical fiber cable was laid along the winding mountain highways. Suddenly, the village gram panchayat had high-speed internet. Telemedicine doctors from premier hospitals in Delhi could examine patients via video consultation, and farmers could check mandi commodity rates live on government portals.</p>
        `
      },
      {
        number: 2,
        title: "The Sound of the QR Code",
        content: `
          <p>Down in the bustling market of Varanasi, roadside tea seller Ramu Ji had no formal credit history. Traditional financial systems had often overlooked street vendors like him. But with the rollout of the Unified Payments Interface (UPI) and PM SVANidhi loans, economic inclusion became instantaneous.</p>
          <p>Every morning, tourists and locals simply tapped their smartphones against his printed QR code. A small audio speaker announced in Hindi: <em>"Dus rupaye praapt hue!"</em> (Ten rupees received). Ramu Ji smiled with pride. "No middleman, no counterfeit currency, instant settlement straight into my bank account."</p>
          <p>India was processing more real-time digital payments than the world's richest economies combined, built on open, non-profit digital public infrastructure designed for all.</p>
        `
      },
      {
        number: 3,
        title: "One Nation, Infinite Possibilities",
        content: `
          <p>Physical and digital connectivity were converging. The sleek semi-high-speed Vande Bharat trains now linked historic towns, state capitals, and remote industrial corridors with speed and safety. Indigenous manufacturing—from semiconductor chips to defence tech—was empowering women and youth across both rural and urban India.</p>
          <p>Standing in front of the map of India at her school assembly, Tsering looked at the web of roads, optical cables, and railway arteries. She understood that India’s greatest strength had always been its unity in diversity. When infrastructure connects every citizen equally, the nation moves forward as one invincible force.</p>
          <div class="reading-key-takeaway">
            <h4>💡 Educational Takeaway</h4>
            <p>Digital and physical public infrastructure democratizes economic opportunities, bridging distances and uniting diverse regions into a self-reliant India.</p>
          </div>
        `
      }
    ]
  }
];
