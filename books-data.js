/**
 * Paatshala - Indian Educational Storybooks & Chapters Data
 * Fictional educational stories inspired by Indian Government initiatives and national development.
 */

const BOOKS_DATA = [
  {
    id: "constitution-of-india",
    title: "The Constitution of India",
    author: "Dr. B.R. Ambedkar & Drafting Committee",
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
    author: "Paatshala Civic Initiative",
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
    author: "National Mission for Clean Ganga",
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
    author: "ISRO Scientific Heritage",
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
    author: "Sarva Shiksha Abhiyan",
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
    author: "National Solar Mission",
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
    author: "Digital India Initiative",
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
,
{
  "id": "cornerstone-of-a-nation",
  "title": "The Indian Constitution: Cornerstone of a Nation",
  "author": "Granville Austin",
  "subtitle": "Classic on the Making of the Constitution",
  "category": "Indian Constitution",
  "readTime": "8 min read",
  "themeColor": "#1e3a8a",
  "accentColor": "#fbbf24",
  "shortDescription": "Granville Austin's definitive classic on how the Constituent Assembly forged democratic unity, a social revolution, and national identity for independent India.",
  "coverBadge": "Constitutional History",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-austin\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#0b132b\"/>\n            <stop offset=\"0.5\" stop-color=\"#1c2541\"/>\n            <stop offset=\"1\" stop-color=\"#1e3a8a\"/>\n          </linearGradient>\n          <linearGradient id=\"gold-austin\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#fef08a\"/>\n            <stop offset=\"50%\" stop-color=\"#f59e0b\"/>\n            <stop offset=\"100%\" stop-color=\"#d97706\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-austin)\"/>\n        <!-- Ornate Framing -->\n        <rect x=\"15\" y=\"15\" width=\"270\" height=\"390\" rx=\"12\" fill=\"none\" stroke=\"url(#gold-austin)\" stroke-width=\"2\" stroke-dasharray=\"6 3\"/>\n        <rect x=\"22\" y=\"22\" width=\"256\" height=\"376\" rx=\"8\" fill=\"none\" stroke=\"url(#gold-austin)\" stroke-width=\"0.8\" opacity=\"0.6\"/>\n        <!-- Ashoka Pillar Capital Emblem Motif -->\n        <circle cx=\"150\" cy=\"165\" r=\"58\" fill=\"none\" stroke=\"url(#gold-austin)\" stroke-width=\"1.8\" opacity=\"0.4\"/>\n        <circle cx=\"150\" cy=\"165\" r=\"46\" fill=\"rgba(245, 158, 11, 0.08)\" stroke=\"url(#gold-austin)\" stroke-width=\"2.5\"/>\n        <!-- Pillar & Scales of Justice -->\n        <path d=\"M150 125 L150 195 M130 142 L170 142 M130 142 L120 162 M130 142 L140 162 M170 142 L160 162 M170 142 L180 162\" stroke=\"url(#gold-austin)\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n        <path d=\"M116 162 Q130 172 144 162 Z M156 162 Q170 172 184 162 Z\" fill=\"url(#gold-austin)\"/>\n        <rect x=\"138\" y=\"195\" width=\"24\" height=\"8\" rx=\"2\" fill=\"url(#gold-austin)\"/>\n        <!-- Author Top Banner -->\n        <text x=\"150\" y=\"65\" fill=\"#fef08a\" font-family=\"'Plus Jakarta Sans', serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">GRANVILLE AUSTIN</text>\n        <line x1=\"75\" y1=\"76\" x2=\"225\" y2=\"76\" stroke=\"url(#gold-austin)\" stroke-width=\"1.2\"/>\n        <!-- Book Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">THE INDIAN</text>\n        <text x=\"150\" y=\"300\" fill=\"#fef08a\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">CONSTITUTION</text>\n        <text x=\"150\" y=\"330\" fill=\"#93c5fd\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"600\" letter-spacing=\"1\" text-anchor=\"middle\">CORNERSTONE OF A NATION</text>\n        <text x=\"150\" y=\"380\" fill=\"#cbd5e1\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Oxford University Press Classic</text>\n      </svg>\n    ",
  "overview": "Granville Austin's landmark history analyzes the Constituent Assembly of India (1946-1949), demonstrating how the Constitution was designed as an engine for social transformation while preserving liberty, democracy, and national integrity.",
  "chapters": [
    {
      "number": 1,
      "title": "The Constituent Assembly: An Assembly of Minds",
      "content": "\n          <p>When the delegates assembled in New Delhi in December 1946, they faced an extraordinary challenge: uniting hundreds of princely states, dozens of linguistic regions, and millions of diverse people into a single sovereign democracy. Granville Austin calls the assembly an intellectual powerhouse committed to consensus and national accommodation.</p>\n          <p>Under the visionary drafting leadership of Dr. B.R. Ambedkar, alongside the constitutional scholarship of Sir B.N. Rau and leaders like Jawaharlal Nehru and Sardar Patel, the assembly worked with meticulous deliberation. They studied world constitutions—from the American Bill of Rights to Irish Directive Principles—adapting universal democratic ideals to Indian realities.</p>\n          <p>The result was a revolutionary founding document that rejected communal representation in favor of universal adult suffrage, ensuring every Indian citizen held equal status from day one.</p>\n        "
    },
    {
      "number": 2,
      "title": "The Conscience of the Constitution",
      "content": "\n          <p>Austin identified Part III (Fundamental Rights) and Part IV (Directive Principles of State Policy) as the twin 'conscience of the Constitution'. Together, they established the legal and moral roadmap for India's social revolution.</p>\n          <p>Fundamental Rights guaranteed negative liberty—protecting citizens from arbitrary state intrusion, abolishing untouchability (Article 17), and securing free expression. Simultaneously, the Directive Principles mandated positive state action: ensuring universal education, equitable economic distribution, and protection of the vulnerable.</p>\n          <p>Neither set of principles was meant to obliterate the other; rather, like two wheels of a chariot, they maintained equilibrium between individual freedom and collective social welfare.</p>\n        "
    },
    {
      "number": 3,
      "title": "Federalism with a Strong Center",
      "content": "\n          <p>India’s federal system was unique in global jurisprudence. Rather than a federation born of formerly independent sovereign states coming together, India adopted what Austin termed 'cooperative federalism' with a strong union center.</p>\n          <p>This design ensured the central government possessed adequate powers to safeguard national security and economic integration while respecting state autonomy through the Union, State, and Concurrent legislative lists. Over seven decades, this constitutional framework has withstood regional challenges, preserving India's democratic unity.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>The Indian Constitution is fundamentally a social charter. Its enduring stability stems from its balance of individual liberty, social justice, and national unity.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "introduction-to-constitution-basu",
  "title": "Introduction to the Constitution of India",
  "author": "Dr. Durga Das Basu",
  "subtitle": "Fundamental Principles & Democratic Institutions",
  "category": "Indian Constitution",
  "readTime": "7 min read",
  "themeColor": "#065f46",
  "accentColor": "#34d399",
  "shortDescription": "Dr. D.D. Basu's authoritative analysis of the Indian constitutional framework, the separation of powers, and the rights guaranteed to every citizen.",
  "coverBadge": "Legal Authority",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-basu\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#022c22\"/>\n            <stop offset=\"0.5\" stop-color=\"#065f46\"/>\n            <stop offset=\"1\" stop-color=\"#047857\"/>\n          </linearGradient>\n          <linearGradient id=\"gold-basu\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#fef08a\"/>\n            <stop offset=\"50%\" stop-color=\"#facc15\"/>\n            <stop offset=\"100%\" stop-color=\"#ca8a04\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-basu)\"/>\n        <!-- Ornate Geometry -->\n        <rect x=\"16\" y=\"16\" width=\"268\" height=\"388\" rx=\"10\" fill=\"none\" stroke=\"url(#gold-basu)\" stroke-width=\"1.8\"/>\n        <rect x=\"22\" y=\"22\" width=\"256\" height=\"376\" rx=\"6\" fill=\"none\" stroke=\"url(#gold-basu)\" stroke-width=\"0.8\" opacity=\"0.6\"/>\n        <!-- Dharma Chakra Emblem -->\n        <circle cx=\"150\" cy=\"165\" r=\"54\" fill=\"none\" stroke=\"url(#gold-basu)\" stroke-width=\"2.5\"/>\n        <circle cx=\"150\" cy=\"165\" r=\"42\" fill=\"rgba(250, 204, 21, 0.08)\" stroke=\"url(#gold-basu)\" stroke-width=\"1\"/>\n        <circle cx=\"150\" cy=\"165\" r=\"8\" fill=\"url(#gold-basu)\"/>\n        <!-- Chakra Spokes -->\n        <g stroke=\"url(#gold-basu)\" stroke-width=\"1.5\" opacity=\"0.85\">\n          <line x1=\"150\" y1=\"123\" x2=\"150\" y2=\"207\"/>\n          <line x1=\"108\" y1=\"165\" x2=\"192\" y2=\"165\"/>\n          <line x1=\"120\" y1=\"135\" x2=\"180\" y2=\"195\"/>\n          <line x1=\"120\" y1=\"195\" x2=\"180\" y2=\"135\"/>\n          <line x1=\"134\" y1=\"125\" x2=\"166\" y2=\"205\"/>\n          <line x1=\"166\" y1=\"125\" x2=\"134\" y2=\"205\"/>\n        </g>\n        <!-- Author Header -->\n        <text x=\"150\" y=\"65\" fill=\"#fef08a\" font-family=\"'Plus Jakarta Sans', serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">DR. DURGA DAS BASU</text>\n        <line x1=\"70\" y1=\"76\" x2=\"230\" y2=\"76\" stroke=\"url(#gold-basu)\" stroke-width=\"1.2\"/>\n        <!-- Title Art -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"16\" font-weight=\"800\" text-anchor=\"middle\">INTRODUCTION TO THE</text>\n        <text x=\"150\" y=\"300\" fill=\"#fef08a\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"15\" font-weight=\"800\" text-anchor=\"middle\">CONSTITUTION OF INDIA</text>\n        <text x=\"150\" y=\"330\" fill=\"#a7f3d0\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"600\" letter-spacing=\"1\" text-anchor=\"middle\">JURISPRUDENCE &amp; RIGHTS</text>\n        <text x=\"150\" y=\"380\" fill=\"#d1fae5\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Standard Constitutional Law Series</text>\n      </svg>\n    ",
  "overview": "Dr. D.D. Basu's classic volume provides an analytical walkthrough of the Constitution of India, explaining the historical background, philosophical preamble, citizenship laws, and functioning of executive, legislative, and judicial branches.",
  "chapters": [
    {
      "number": 1,
      "title": "The Preamble and Nature of the Indian State",
      "content": "\n          <p>Dr. D.D. Basu begins by deconstructing the Preamble as the key to unlock the minds of the framers. The declaration of India as a 'Sovereign, Socialist, Secular, Democratic Republic' establishes both external independence and internal constitutional supremacy.</p>\n          <p>Basu emphasizes that Indian secularism is not anti-religious or strictly separationist like Western models; rather, it is <em>Sarva Dharma Sambhava</em>—equal respect for all religions and non-discrimination by the State under Articles 25 to 28.</p>\n          <p>Democratic governance is ensured through the cabinet system of government responsible to the popularly elected Lok Sabha, anchoring executive accountability directly to the people.</p>\n        "
    },
    {
      "number": 2,
      "title": "The Golden Triangle: Articles 14, 19, and 21",
      "content": "\n          <p>One of Basu's most celebrated analyses concerns the inter-relationship of fundamental freedoms. The Supreme Court's jurisprudence in the Maneka Gandhi case unified Articles 14 (Equality), 19 (Freedoms of Speech, Assembly, Movement), and 21 (Right to Life and Personal Liberty) into a 'Golden Triangle'.</p>\n          <p>No law depriving a person of life or personal liberty can be arbitrary; it must be just, fair, and reasonable. Over the decades, Article 21 has expanded through judicial interpretation to include the right to privacy, clean air, education, and human dignity.</p>\n        "
    },
    {
      "number": 3,
      "title": "Constitutional Remedies: The Heart and Soul",
      "content": "\n          <p>A declaration of rights is meaningless without mechanisms for enforcement. Dr. Ambedkar famously described Article 32—the right to move the Supreme Court for enforcement of Fundamental Rights via writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto)—as the 'heart and soul' of the Constitution.</p>\n          <p>Basu documents how Public Interest Litigation (PIL) evolved from these provisions, allowing ordinary citizens and social workers to approach courts on behalf of the underprivileged, making justice accessible to all.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Constitutional rights depend on judicial remedies. The rule of law and the independence of the judiciary are vital to defending citizen rights against state overreach.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "we-the-people-palkhivala",
  "title": "We, the People: The Citizen and the Constitution",
  "author": "Nani A. Palkhivala",
  "subtitle": "Defending Liberty and Constitutional Morality",
  "category": "Indian Constitution",
  "readTime": "7 min read",
  "themeColor": "#7f1d1d",
  "accentColor": "#fbbf24",
  "shortDescription": "Eminent jurist Nani Palkhivala’s passionate defense of civil liberties, the supremacy of the citizen, and the inviolable Basic Structure Doctrine.",
  "coverBadge": "Civic Liberty",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-palkhi\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#450a0a\"/>\n            <stop offset=\"0.5\" stop-color=\"#7f1d1d\"/>\n            <stop offset=\"1\" stop-color=\"#991b1b\"/>\n          </linearGradient>\n          <linearGradient id=\"gold-palkhi\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#fef08a\"/>\n            <stop offset=\"50%\" stop-color=\"#f59e0b\"/>\n            <stop offset=\"100%\" stop-color=\"#d97706\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-palkhi)\"/>\n        <!-- Torch of Liberty Motif -->\n        <rect x=\"16\" y=\"16\" width=\"268\" height=\"388\" rx=\"10\" fill=\"none\" stroke=\"url(#gold-palkhi)\" stroke-width=\"1.8\"/>\n        <circle cx=\"150\" cy=\"165\" r=\"50\" fill=\"rgba(245, 158, 11, 0.1)\" stroke=\"url(#gold-palkhi)\" stroke-width=\"2\"/>\n        <!-- Flame of Liberty & Scales -->\n        <path d=\"M150 125 C140 138 142 148 150 155 C158 148 160 138 150 125 Z\" fill=\"#fbbf24\"/>\n        <path d=\"M150 138 C145 145 146 150 150 154 C154 150 155 145 150 138 Z\" fill=\"#ffffff\"/>\n        <path d=\"M140 160 L160 160 L156 195 L144 195 Z\" fill=\"url(#gold-palkhi)\"/>\n        <rect x=\"135\" y=\"195\" width=\"30\" height=\"8\" rx=\"2\" fill=\"url(#gold-palkhi)\"/>\n        <!-- Author Header -->\n        <text x=\"150\" y=\"65\" fill=\"#fef08a\" font-family=\"'Plus Jakarta Sans', serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">NANI A. PALKHIVALA</text>\n        <line x1=\"60\" y1=\"76\" x2=\"240\" y2=\"76\" stroke=\"url(#gold-palkhi)\" stroke-width=\"1.2\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"20\" font-weight=\"800\" text-anchor=\"middle\">WE, THE PEOPLE</text>\n        <text x=\"150\" y=\"305\" fill=\"#fef08a\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">THE CITIZEN &amp; CONSTITUTION</text>\n        <text x=\"150\" y=\"335\" fill=\"#fecaca\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"500\" letter-spacing=\"1\" text-anchor=\"middle\">ESSAYS ON LIBERTY &amp; LAW</text>\n        <text x=\"150\" y=\"380\" fill=\"#fee2e2\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Strand Book Stall Classic</text>\n      </svg>\n    ",
  "overview": "In this stirring collection of essays and courtroom arguments, Nani Palkhivala defends the fundamental freedoms of Indian citizens, explaining the historic Kesavananda Bharati verdict and the eternal duty of preserving democracy.",
  "chapters": [
    {
      "number": 1,
      "title": "The True Sovereign: The Citizen",
      "content": "\n          <p>Nani Palkhivala opens with a powerful reminder: the Constitution was enacted by 'We, the People'. The state and its politicians are not the masters of the nation; they are merely trustees tasked with managing public affairs under constitutional boundaries.</p>\n          <p>He argued fiercely against bureaucratic inertia and totalitarian impulses, asserting that economic prosperity and personal liberty must walk hand in hand. A society that sacrifices individual freedom for transient political efficiency loses both.</p>\n        "
    },
    {
      "number": 2,
      "title": "The Kesavananda Bharati Landmark",
      "content": "\n          <p>Palkhivala’s most monumental legal battle occurred in 1973 before a special 13-judge bench of the Supreme Court in <em>Kesavananda Bharati v. State of Kerala</em>. Parliament had claimed the absolute right to amend or delete any part of the Constitution, including Fundamental Rights.</p>\n          <p>Palkhivala argued that Parliament is a creature of the Constitution and cannot usurp the power to destroy its own creator. By a razor-thin 7:6 majority, the Supreme Court ruled that while Parliament can amend articles, it cannot alter the 'Basic Structure' of the Constitution—such as democracy, judicial independence, secularism, and equality.</p>\n        "
    },
    {
      "number": 3,
      "title": "Constitutional Morality in Public Life",
      "content": "\n          <p>Palkhivala warned that constitutional liberty is never self-executing. It requires citizens who refuse to be intimidated and public servants dedicated to constitutional morality rather than personal ambition.</p>\n          <p>He urged university students to cultivate courage, integrity, and civic literacy. Freedom survives not in statutes or courtroom judgements, but in the hearts and minds of the men and women who love liberty.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>The Basic Structure Doctrine protects democracy from authoritarian overreach. Active civic engagement and moral courage are the ultimate guardians of freedom.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "thinking-fast-and-slow",
  "title": "Thinking, Fast and Slow",
  "author": "Daniel Kahneman",
  "subtitle": "The Two Systems That Shape Human Judgment",
  "category": "Psychology",
  "readTime": "8 min read",
  "themeColor": "#4c1d95",
  "accentColor": "#a78bfa",
  "shortDescription": "Nobel laureate Daniel Kahneman explains the dual cognitive systems of the mind: intuitive, emotional System 1 versus logical, deliberative System 2.",
  "coverBadge": "Behavioral Science",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-kahneman\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#1e1035\"/>\n            <stop offset=\"0.5\" stop-color=\"#3b0764\"/>\n            <stop offset=\"1\" stop-color=\"#4c1d95\"/>\n          </linearGradient>\n          <linearGradient id=\"brain-glow\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#f43f5e\"/>\n            <stop offset=\"50%\" stop-color=\"#a855f7\"/>\n            <stop offset=\"100%\" stop-color=\"#38bdf8\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-kahneman)\"/>\n        <!-- Dual Brain Art -->\n        <circle cx=\"150\" cy=\"165\" r=\"62\" fill=\"rgba(168, 85, 247, 0.12)\" stroke=\"url(#brain-glow)\" stroke-width=\"2\"/>\n        <!-- Left Side: Fast Lightning Impulse (System 1) -->\n        <path d=\"M148 120 C125 120 110 135 110 160 C110 185 125 200 148 200 Z\" fill=\"none\" stroke=\"#f43f5e\" stroke-width=\"3\" stroke-dasharray=\"5 3\"/>\n        <polygon points=\"126,145 136,158 124,162 138,180\" fill=\"#f43f5e\"/>\n        <!-- Right Side: Slow Precision Gears (System 2) -->\n        <path d=\"M152 120 C175 120 190 135 190 160 C190 185 175 200 152 200 Z\" fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"3\"/>\n        <circle cx=\"170\" cy=\"160\" r=\"14\" fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"2.5\"/>\n        <circle cx=\"170\" cy=\"160\" r=\"5\" fill=\"#38bdf8\"/>\n        <!-- Center Divider Line -->\n        <line x1=\"150\" y1=\"115\" x2=\"150\" y2=\"205\" stroke=\"#ffffff\" stroke-width=\"2\" opacity=\"0.6\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"65\" fill=\"#e9d5ff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">DANIEL KAHNEMAN</text>\n        <text x=\"150\" y=\"80\" fill=\"#c084fc\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"1\" text-anchor=\"middle\">NOBEL LAUREATE IN ECONOMICS</text>\n        <!-- Title -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"19\" font-weight=\"800\" text-anchor=\"middle\">THINKING,</text>\n        <text x=\"150\" y=\"302\" fill=\"#a78bfa\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"19\" font-weight=\"800\" text-anchor=\"middle\">FAST AND SLOW</text>\n        <text x=\"150\" y=\"332\" fill=\"#e9d5ff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"600\" letter-spacing=\"1\" text-anchor=\"middle\">THE ARCHITECTURE OF COGNITION</text>\n        <text x=\"150\" y=\"380\" fill=\"#d8b4fe\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Farrar, Straus and Giroux Classic</text>\n      </svg>\n    ",
  "overview": "Daniel Kahneman synthesizes decades of behavioral psychology to explain the mechanics of human intuition, cognitive illusions, risk framing, and decision-making under uncertainty.",
  "chapters": [
    {
      "number": 1,
      "title": "System 1 and System 2: Intuition vs Reflection",
      "content": "\n          <p>Kahneman introduces two characters in our mental drama. System 1 operates automatically and swiftly, with little or no conscious effort (like recognizing a face or reacting to a sudden loud sound). It is our instinctual survival engine.</p>\n          <p>System 2, in contrast, allocates conscious attention to effortful mental operations, including complex computations, critical reading, and self-control. While we identify ourselves with System 2, Kahneman proves that System 1 quietly influences almost every judgment we make.</p>\n        "
    },
    {
      "number": 2,
      "title": "Heuristics, Biases, and the Anchoring Trap",
      "content": "\n          <p>When faced with a difficult question, System 1 substitutes an easier question without us noticing. Kahneman explores heuristics like 'Availability' (judging frequency based on how easily examples come to mind) and 'Anchoring' (being subconsciously influenced by unrelated numbers mentioned beforehand).</p>\n          <p>These cognitive shortcuts were evolutionarily useful in ancestral environments, but in modern finance, medicine, and law, they lead to systematic errors unless consciously checked by System 2.</p>\n        "
    },
    {
      "number": 3,
      "title": "Loss Aversion and the Two Selves",
      "content": "\n          <p>Through Prospect Theory, Kahneman demonstrates that humans feel the pain of a loss roughly twice as intensely as the pleasure of an equivalent gain ('Loss Aversion'). This asymmetry explains why people hold onto bad investments and fear reasonable risks.</p>\n          <p>He concludes with the distinction between the 'Experiencing Self' (which lives in the present moment) and the 'Remembering Self' (which evaluates life through peak moments and endings), guiding readers toward happier, more rational life decisions.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Awareness of cognitive biases allows us to slow down our thinking when high-stakes decisions arise, tempering emotional impulses with rational analysis.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "mans-search-for-meaning",
  "title": "Man's Search for Meaning",
  "author": "Viktor E. Frankl",
  "subtitle": "The Psychological Quest for Purpose",
  "category": "Psychology",
  "readTime": "7 min read",
  "themeColor": "#0f172a",
  "accentColor": "#38bdf8",
  "shortDescription": "Psychiatrist Viktor Frankl’s transcendent memoir and psychological treatise on finding purpose, resilience, and spiritual freedom in any circumstance.",
  "coverBadge": "Human Resilience",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-frankl\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#020617\"/>\n            <stop offset=\"0.5\" stop-color=\"#0f172a\"/>\n            <stop offset=\"1\" stop-color=\"#1e293b\"/>\n          </linearGradient>\n          <linearGradient id=\"light-beam\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#fef08a\"/>\n            <stop offset=\"40%\" stop-color=\"#38bdf8\"/>\n            <stop offset=\"100%\" stop-color=\"transparent\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-frankl)\"/>\n        <!-- Mountain Peak with Rising Sun of Hope -->\n        <polygon points=\"150,90 220,210 80,210\" fill=\"url(#light-beam)\" opacity=\"0.35\"/>\n        <path d=\"M150 120 L200 210 L100 210 Z\" fill=\"#1e293b\" stroke=\"#38bdf8\" stroke-width=\"1.8\"/>\n        <path d=\"M150 120 L170 170 L150 160 L135 180 Z\" fill=\"#e2e8f0\"/>\n        <!-- Rising Star of Purpose -->\n        <circle cx=\"150\" cy=\"95\" r=\"12\" fill=\"#fef08a\"/>\n        <line x1=\"150\" y1=\"70\" x2=\"150\" y2=\"120\" stroke=\"#fef08a\" stroke-width=\"2\"/>\n        <line x1=\"125\" y1=\"95\" x2=\"175\" y2=\"95\" stroke=\"#fef08a\" stroke-width=\"2\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"60\" fill=\"#94a3b8\" font-family=\"'Plus Jakarta Sans', serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">VIKTOR E. FRANKL</text>\n        <line x1=\"80\" y1=\"70\" x2=\"220\" y2=\"70\" stroke=\"#38bdf8\" stroke-width=\"1\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"19\" font-weight=\"800\" text-anchor=\"middle\">MAN'S SEARCH</text>\n        <text x=\"150\" y=\"302\" fill=\"#38bdf8\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"19\" font-weight=\"800\" text-anchor=\"middle\">FOR MEANING</text>\n        <text x=\"150\" y=\"332\" fill=\"#cbd5e1\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"500\" letter-spacing=\"1\" text-anchor=\"middle\">THE TRIUMPH OF PURPOSE</text>\n        <text x=\"150\" y=\"380\" fill=\"#94a3b8\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Beacon Press International Landmark</text>\n      </svg>\n    ",
  "overview": "Viktor Frankl chronicles his survival of Nazi concentration camps and details Logotherapy—the therapeutic school built on the conviction that human life is driven by the will to meaning.",
  "chapters": [
    {
      "number": 1,
      "title": "The Will to Meaning in Adversity",
      "content": "\n          <p>Viktor Frankl observed in Auschwitz that prisoners who succumbed to despair lost the physical will to survive, whereas those who held onto a vivid future purpose—completing an unfinished book, reuniting with loved ones, or serving a spiritual mission—manifested astonishing resilience.</p>\n          <p>Frankl famously cited Friedrich Nietzsche: <em>\"He who has a why to live can bear almost any how.\"</em> When external conditions stripped away identity, health, and dignity, the last human freedom remained: the freedom to choose one's attitude in any given set of circumstances.</p>\n        "
    },
    {
      "number": 2,
      "title": "Logotherapy: Three Sources of Meaning",
      "content": "\n          <p>Frankl founded the 'Third Viennese School of Psychotherapy', named Logotherapy (from the Greek <em>logos</em>, meaning purpose). Unlike Freud's focus on pleasure or Adler's focus on power, Logotherapy posits that the primary motivational force in humans is finding meaning.</p>\n          <p>Frankl outlined three principal pathways to meaning:</p>\n          <ul>\n            <li><strong>By creating a work or doing a deed:</strong> Artistic creation, scientific discovery, or building a meaningful enterprise.</li>\n            <li><strong>By experiencing something or encountering someone:</strong> Deep appreciation of nature, art, and the transcendent gift of love.</li>\n            <li><strong>By the attitude we take toward unavoidable suffering:</strong> Transforming a personal tragedy into a moral triumph.</li>\n          </ul>\n        "
    },
    {
      "number": 3,
      "title": "Tragic Optimism and Modern Purpose",
      "content": "\n          <p>In modern societies characterized by the 'existential vacuum' (boredom and apathy), Frankl's philosophy offers a luminous remedy: 'Tragic Optimism'—saying yes to life in spite of pain, guilt, and death.</p>\n          <p>Life does not ask us what we expect from it; rather, life questions us, and we must answer by taking responsibility for our decisions. Purpose is not an abstract concept to be debated; it is a daily responsibility to be lived.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Circumstances cannot destroy our inner freedom. When we anchor our lives to meaningful responsibilities and service to others, we unlock invincible mental resilience.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "the-psychology-of-money",
  "title": "The Psychology of Money",
  "author": "Morgan Housel",
  "subtitle": "Timeless Lessons on Wealth, Greed, and Happiness",
  "category": "Psychology",
  "readTime": "7 min read",
  "themeColor": "#064e3b",
  "accentColor": "#10b981",
  "shortDescription": "Morgan Housel explores how human psychology, ego, emotional patience, and behavioral discipline govern personal decisions more than spreadsheet calculations.",
  "coverBadge": "Behavioral Mindset",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-housel\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#022c22\"/>\n            <stop offset=\"0.5\" stop-color=\"#064e3b\"/>\n            <stop offset=\"1\" stop-color=\"#047857\"/>\n          </linearGradient>\n          <linearGradient id=\"emerald-glow\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#a7f3d0\"/>\n            <stop offset=\"50%\" stop-color=\"#34d399\"/>\n            <stop offset=\"100%\" stop-color=\"#059669\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-housel)\"/>\n        <!-- Geometric Compounding Growth Tree Motif -->\n        <circle cx=\"150\" cy=\"165\" r=\"60\" fill=\"rgba(16, 185, 129, 0.1)\" stroke=\"url(#emerald-glow)\" stroke-width=\"2\"/>\n        <!-- Tree Branches & Coin Nodes -->\n        <path d=\"M150 205 L150 155 M150 170 L130 145 M150 170 L170 145 M150 155 L140 135 M150 155 L160 135\" stroke=\"url(#emerald-glow)\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n        <circle cx=\"130\" cy=\"145\" r=\"7\" fill=\"#fbbf24\"/>\n        <circle cx=\"170\" cy=\"145\" r=\"7\" fill=\"#fbbf24\"/>\n        <circle cx=\"140\" cy=\"130\" r=\"5\" fill=\"#34d399\"/>\n        <circle cx=\"160\" cy=\"130\" r=\"5\" fill=\"#34d399\"/>\n        <circle cx=\"150\" cy=\"120\" r=\"8\" fill=\"#fef08a\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"65\" fill=\"#a7f3d0\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">MORGAN HOUSEL</text>\n        <line x1=\"80\" y1=\"75\" x2=\"220\" y2=\"75\" stroke=\"url(#emerald-glow)\" stroke-width=\"1.2\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"18\" font-weight=\"800\" text-anchor=\"middle\">THE PSYCHOLOGY</text>\n        <text x=\"150\" y=\"302\" fill=\"#34d399\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"20\" font-weight=\"800\" text-anchor=\"middle\">OF MONEY</text>\n        <text x=\"150\" y=\"332\" fill=\"#d1fae5\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"500\" letter-spacing=\"1\" text-anchor=\"middle\">WEALTH, GREED &amp; HAPPINESS</text>\n        <text x=\"150\" y=\"380\" fill=\"#a7f3d0\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Harriman House Bestseller</text>\n      </svg>\n    ",
  "overview": "Morgan Housel shares 19 short stories analyzing how ego, pride, envy, and emotional discipline impact how people think about financial choices, proving that behavior matters more than analytical intelligence.",
  "chapters": [
    {
      "number": 1,
      "title": "No One's Crazy: Different Lived Realities",
      "content": "\n          <p>Housel begins by explaining that people from different generations, raised by parents with different incomes and lived experiences, develop fundamentally different worldviews. Someone who grew up during high inflation looks at risk in ways that someone who grew up during an economic boom never will.</p>\n          <p>No decision is made purely on a spreadsheet. When people make choices, they do so based on emotional stories they tell themselves about security, status, and fear.</p>\n        "
    },
    {
      "number": 2,
      "title": "Compounding and the Superpower of Patience",
      "content": "\n          <p>More than 99% of Warren Buffett's wealth was accumulated after his 50th birthday. Housel argues that Buffett’s true genius was not just picking stocks, but staying invested consistently for over seven decades.</p>\n          <p>Compounding does not rely on extraordinary returns; it relies on uninterrupted time. The secret to long-term success is endurance—avoiding fatal errors and remaining patient when markets fluctuate.</p>\n        "
    },
    {
      "number": 3,
      "title": "Freedom and the Psychology of 'Enough'",
      "content": "\n          <p>The highest form of wealth is the ability to wake up every morning and say, <em>\"I can do whatever I want today.\"</em> Using money to buy control over your time yields infinitely more sustained happiness than buying luxury goods to impress strangers.</p>\n          <p>Housel cautions against moving the goalposts of satisfaction. True financial peace requires mastering the psychology of 'enough', rejecting envy, and valuing independence above external display.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Financial wisdom is primarily behavioral. Cultivating emotional patience, avoiding comparisons, and valuing personal freedom create lasting well-being.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "bigger-leaner-stronger",
  "title": "Bigger Leaner Stronger",
  "author": "Michael Matthews",
  "subtitle": "The Science of Building a Strong, Healthy Body",
  "category": "Fitness",
  "readTime": "7 min read",
  "themeColor": "#991b1b",
  "accentColor": "#ef4444",
  "shortDescription": "Michael Matthews breaks down the science of progressive overload, resistance training, macronutrient energy balance, and building lasting muscular strength and health.",
  "coverBadge": "Strength Science",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-bls\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#450a0a\"/>\n            <stop offset=\"0.5\" stop-color=\"#7f1d1d\"/>\n            <stop offset=\"1\" stop-color=\"#991b1b\"/>\n          </linearGradient>\n          <linearGradient id=\"red-power\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#fca5a5\"/>\n            <stop offset=\"50%\" stop-color=\"#ef4444\"/>\n            <stop offset=\"100%\" stop-color=\"#b91c1c\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-bls)\"/>\n        <!-- Heavy Olympic Barbell Art -->\n        <circle cx=\"150\" cy=\"165\" r=\"62\" fill=\"rgba(239, 68, 68, 0.12)\" stroke=\"url(#red-power)\" stroke-width=\"2\"/>\n        <!-- Barbell Plates -->\n        <rect x=\"70\" y=\"160\" width=\"160\" height=\"10\" rx=\"4\" fill=\"#e2e8f0\"/>\n        <rect x=\"90\" y=\"135\" width=\"14\" height=\"60\" rx=\"3\" fill=\"url(#red-power)\"/>\n        <rect x=\"76\" y=\"145\" width=\"10\" height=\"40\" rx=\"2\" fill=\"#ef4444\"/>\n        <rect x=\"196\" y=\"135\" width=\"14\" height=\"60\" rx=\"3\" fill=\"url(#red-power)\"/>\n        <rect x=\"214\" y=\"145\" width=\"10\" height=\"40\" rx=\"2\" fill=\"#ef4444\"/>\n        <circle cx=\"150\" cy=\"165\" r=\"4\" fill=\"#ffffff\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"65\" fill=\"#fca5a5\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">MICHAEL MATTHEWS</text>\n        <line x1=\"75\" y1=\"75\" x2=\"225\" y2=\"75\" stroke=\"url(#red-power)\" stroke-width=\"1.2\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"18\" font-weight=\"800\" text-anchor=\"middle\">BIGGER LEANER</text>\n        <text x=\"150\" y=\"302\" fill=\"#fca5a5\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"20\" font-weight=\"800\" text-anchor=\"middle\">STRONGER</text>\n        <text x=\"150\" y=\"332\" fill=\"#fee2e2\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"600\" letter-spacing=\"1\" text-anchor=\"middle\">SIMPLE SCIENCE OF MUSCLE</text>\n        <text x=\"150\" y=\"380\" fill=\"#fca5a5\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Oculus Health &amp; Fitness Classic</text>\n      </svg>\n    ",
  "overview": "Michael Matthews demystifies exercise physiology and human nutrition, outlining evidence-based strategies for resistance training, progressive tension overload, and long-term metabolic health.",
  "chapters": [
    {
      "number": 1,
      "title": "The Law of Progressive Overload",
      "content": "\n          <p>Muscles do not grow in response to random gimmicks or extreme exhaustion; they adapt specifically to progressive mechanical tension. Progressive overload means systematically increasing the weight or reps lifted over time.</p>\n          <p>Matthews emphasizes focusing on heavy compound barbell exercises—such as squats, bench presses, and deadlifts—which recruit multiple large muscle groups simultaneously and trigger natural hormonal and neuromuscular adaptation.</p>\n        "
    },
    {
      "number": 2,
      "title": "The Realities of Energy Balance and Nutrition",
      "content": "\n          <p>Nutrition comes down to thermodynamic laws: energy in versus energy out. Matthews dispels myths about magical fat-burning supplements or demonized carbohydrate groups.</p>\n          <p>He outlines the essential hierarchy of nutrition: hitting total caloric balance, consuming adequate protein (around 1.6 to 2.2 grams per kilogram of body weight for active individuals), and balancing complex carbohydrates and essential healthy fats for endocrine support.</p>\n        "
    },
    {
      "number": 3,
      "title": "Recovery: Sleep and Habitual Consistency",
      "content": "\n          <p>Workouts do not build muscle; they create the micro-stimulus for repair. Real growth and tissue restoration happen during deep sleep and rest phases.</p>\n          <p>Matthews stresses that getting 7 to 9 hours of quality sleep, staying hydrated, and adhering to consistent workout schedules produce superior lifelong results compared to unsustainable crash diets and extreme overtraining.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Physical fitness relies on progressive resistance training, adequate protein and sleep, and patient adherence to fundamental biomechanical laws.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "born-to-run",
  "title": "Born to Run",
  "author": "Christopher McDougall",
  "subtitle": "A Hidden Tribe, Superathletes, and Natural Movement",
  "category": "Fitness",
  "readTime": "8 min read",
  "themeColor": "#c2410c",
  "accentColor": "#fb923c",
  "shortDescription": "Christopher McDougall investigates the natural mechanics of human endurance, cardiovascular fitness, and the Tarahumara runners of Mexico.",
  "coverBadge": "Endurance & Health",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-btr\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#431407\"/>\n            <stop offset=\"0.5\" stop-color=\"#9a3412\"/>\n            <stop offset=\"1\" stop-color=\"#c2410c\"/>\n          </linearGradient>\n          <linearGradient id=\"orange-sun\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#ffedd5\"/>\n            <stop offset=\"50%\" stop-color=\"#fed7aa\"/>\n            <stop offset=\"100%\" stop-color=\"#f97316\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-btr)\"/>\n        <!-- Canyon Sun and Trail Runner Art -->\n        <circle cx=\"150\" cy=\"155\" r=\"62\" fill=\"url(#orange-sun)\" opacity=\"0.9\"/>\n        <!-- Canyon Ridges -->\n        <path d=\"M0 210 Q70 180 140 210 T300 190 L300 240 L0 240 Z\" fill=\"#7c2d12\"/>\n        <path d=\"M0 225 Q80 200 160 225 T300 215 L300 260 L0 260 Z\" fill=\"#431407\"/>\n        <!-- Runner Silhouette -->\n        <circle cx=\"155\" cy=\"140\" r=\"5\" fill=\"#431407\"/>\n        <path d=\"M154 146 L150 162 L140 174 M150 162 L162 172 L166 186 M146 152 L136 158 M154 152 L164 156\" stroke=\"#431407\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"65\" fill=\"#fdba74\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">CHRISTOPHER MCDOUGALL</text>\n        <line x1=\"70\" y1=\"75\" x2=\"230\" y2=\"75\" stroke=\"#fed7aa\" stroke-width=\"1.2\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"280\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"21\" font-weight=\"800\" text-anchor=\"middle\">BORN TO RUN</text>\n        <text x=\"150\" y=\"308\" fill=\"#fed7aa\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">THE NATURAL ATHLETE</text>\n        <text x=\"150\" y=\"336\" fill=\"#ffedd5\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"500\" letter-spacing=\"1\" text-anchor=\"middle\">ENDURANCE &amp; HUMAN MOVEMENT</text>\n        <text x=\"150\" y=\"380\" fill=\"#fdba74\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Alfred A. Knopf International Bestseller</text>\n      </svg>\n    ",
  "overview": "Christopher McDougall embarks on an adventure into the Copper Canyons of Mexico to learn the running secrets of the Tarahumara tribe, exploring how endurance running shaped human evolution and longevity.",
  "chapters": [
    {
      "number": 1,
      "title": "The Tarahumara and the Running Tribe",
      "content": "\n          <p>Suffering from recurrent running injuries, journalist Christopher McDougall asked a simple question: why do modern athletes with high-tech cushioned shoes suffer so many stress fractures, while the Tarahumara indigenous people run hundreds of miles across rocky trails in simple tyre-rubber sandals without joint pain?</p>\n          <p>The Tarahumara don't run out of punishment or grim duty; they run with radiant joy, laughing and playing team running games (rarájipari) that celebrate health and community solidarity.</p>\n        "
    },
    {
      "number": 2,
      "title": "The Persistence Hunting Hypothesis",
      "content": "\n          <p>Teaming up with evolutionary biologist Dr. Daniel Lieberman at Harvard, McDougall highlights the 'Persistence Hunting Hypothesis'. While four-legged animals can sprint faster than humans, they cannot pant and cool their bodies while galloping.</p>\n          <p>Humans, however, possess millions of sweat glands, an upright bipedal posture, the nuchal ligament in the neck, and arch springs in the feet—making us the greatest endurance animals on planet Earth over long distances under heat.</p>\n        "
    },
    {
      "number": 3,
      "title": "Natural Biomechanics and Joyful Movement",
      "content": "\n          <p>Modern cushioned shoes often encourage heavy heel-striking that sends shock waves through knees and hips. Natural running favors midfoot landings, short quick strides (180 steps per minute), upright posture, and relaxed shoulders.</p>\n          <p>Running is not just physical conditioning; it is an ancestral human heritage. McDougall reminds readers: <em>\"You don't stop running because you get old; you get old because you stop running.\"</em></p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Our bodies are naturally engineered for endurance. Cardiovascular health and proper natural running posture protect joints and promote lifelong vigor.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "starting-strength",
  "title": "Starting Strength",
  "author": "Mark Rippetoe",
  "subtitle": "Basic Barbell Training and Biomechanics",
  "category": "Fitness",
  "readTime": "8 min read",
  "themeColor": "#1e293b",
  "accentColor": "#38bdf8",
  "shortDescription": "Mark Rippetoe's definitive guide to human biomechanics, neuromuscular adaptation, and mastering the fundamental compound barbell lifts for lifelong vigor.",
  "coverBadge": "Biomechanics",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-ss\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#0f172a\"/>\n            <stop offset=\"0.5\" stop-color=\"#1e293b\"/>\n            <stop offset=\"1\" stop-color=\"#334155\"/>\n          </linearGradient>\n          <linearGradient id=\"cyan-steel\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#bae6fd\"/>\n            <stop offset=\"50%\" stop-color=\"#38bdf8\"/>\n            <stop offset=\"100%\" stop-color=\"#0284c7\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-ss)\"/>\n        <!-- Biomechanical Barbell Vector Art -->\n        <circle cx=\"150\" cy=\"165\" r=\"62\" fill=\"rgba(56, 189, 248, 0.08)\" stroke=\"url(#cyan-steel)\" stroke-width=\"2\"/>\n        <line x1=\"75\" y1=\"165\" x2=\"225\" y2=\"165\" stroke=\"#ffffff\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n        <!-- Heavy Plates -->\n        <circle cx=\"105\" cy=\"165\" r=\"32\" fill=\"none\" stroke=\"url(#cyan-steel)\" stroke-width=\"4\"/>\n        <circle cx=\"195\" cy=\"165\" r=\"32\" fill=\"none\" stroke=\"url(#cyan-steel)\" stroke-width=\"4\"/>\n        <circle cx=\"105\" cy=\"165\" r=\"16\" fill=\"#38bdf8\"/>\n        <circle cx=\"195\" cy=\"165\" r=\"16\" fill=\"#38bdf8\"/>\n        <!-- Center Knurling Marks -->\n        <line x1=\"140\" y1=\"162\" x2=\"140\" y2=\"168\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n        <line x1=\"160\" y1=\"162\" x2=\"160\" y2=\"168\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"65\" fill=\"#bae6fd\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">MARK RIPPETOE</text>\n        <line x1=\"75\" y1=\"75\" x2=\"225\" y2=\"75\" stroke=\"url(#cyan-steel)\" stroke-width=\"1.2\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"19\" font-weight=\"800\" text-anchor=\"middle\">STARTING STRENGTH</text>\n        <text x=\"150\" y=\"302\" fill=\"#38bdf8\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\">BASIC BARBELL TRAINING</text>\n        <text x=\"150\" y=\"332\" fill=\"#e2e8f0\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"500\" letter-spacing=\"1\" text-anchor=\"middle\">BIOMECHANICS &amp; HUMAN POWER</text>\n        <text x=\"150\" y=\"380\" fill=\"#94a3b8\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">The Aasgaard Company Classic</text>\n      </svg>\n    ",
  "overview": "Mark Rippetoe provides a detailed mechanical analysis of the five foundational barbell lifts, explaining how compound resistance training builds bone mineral density, strengthens joint integrity, and prevents age-related frailty.",
  "chapters": [
    {
      "number": 1,
      "title": "The Biomechanics of Human Strength",
      "content": "\n          <p>Rippetoe establishes a foundational truth: physical strength is the fundamental athletic attribute from which all other capabilities (speed, power, agility, and endurance) flow. A stronger person runs faster, endures longer, and suffers fewer injuries.</p>\n          <p>Using classical physics (moment arms, levers, and centers of gravity), he explains why moving a barbell in a vertical line directly over the midfoot provides the most mechanically efficient and anatomically safe movement pattern.</p>\n        "
    },
    {
      "number": 2,
      "title": "Mastering the Primary Compound Lifts",
      "content": "\n          <p>The program focuses on five primary multi-joint exercises:</p>\n          <ul>\n            <li><strong>The Squat:</strong> The king of exercises, building leg, hip, and posterior chain strength through a full range of motion below parallel.</li>\n            <li><strong>The Deadlift:</strong> Picking heavy resistance off the floor with a flat back, strengthening the spine, grip, and posterior chain.</li>\n            <li><strong>The Overhead Press:</strong> Pressing weight overhead, strengthening shoulders, triceps, and core balance without back support.</li>\n            <li><strong>The Bench Press:</strong> Upper body horizontal pressing power.</li>\n            <li><strong>The Power Clean:</strong> Developing explosive power and rapid triple extension of ankles, knees, and hips.</li>\n          </ul>\n        "
    },
    {
      "number": 3,
      "title": "Strength as the Foundation of Health",
      "content": "\n          <p>Compound barbell training is not just for competitive athletes; it is essential medicine for people of all ages. Loading the skeleton stimulates osteoblast activity, increasing bone density to prevent osteoporosis.</p>\n          <p>By learning proper form and progressively adding manageable weight to the bar week after week, individuals build physical resilience that lasts throughout their lives.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Compound resistance training is essential for bone density and physical durability. Sound biomechanics and consistency are the foundation of lifelong health.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "clean-code",
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "subtitle": "A Handbook of Agile Software Craftsmanship",
  "category": "Technology",
  "readTime": "8 min read",
  "themeColor": "#0369a1",
  "accentColor": "#06b6d4",
  "shortDescription": "Uncle Bob Martin's iconic handbook on writing readable, expressive code, designing elegant architectures, and practicing true software engineering craftsmanship.",
  "coverBadge": "Software Craftsmanship",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-cc\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#082f49\"/>\n            <stop offset=\"0.5\" stop-color=\"#0369a1\"/>\n            <stop offset=\"1\" stop-color=\"#0284c7\"/>\n          </linearGradient>\n          <linearGradient id=\"cyan-code\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#a5f3fc\"/>\n            <stop offset=\"50%\" stop-color=\"#22d3ee\"/>\n            <stop offset=\"100%\" stop-color=\"#0891b2\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-cc)\"/>\n        <!-- Clean Syntax Brackets & Code Circuit -->\n        <circle cx=\"150\" cy=\"165\" r=\"62\" fill=\"rgba(34, 211, 238, 0.1)\" stroke=\"url(#cyan-code)\" stroke-width=\"2\"/>\n        <!-- Bracket Graphics < / > -->\n        <path d=\"M125 145 L105 165 L125 185\" stroke=\"url(#cyan-code)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        <line x1=\"140\" y1=\"188\" x2=\"160\" y2=\"142\" stroke=\"#ffffff\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n        <path d=\"M175 145 L195 165 L175 185\" stroke=\"url(#cyan-code)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"65\" fill=\"#a5f3fc\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">ROBERT C. MARTIN</text>\n        <text x=\"150\" y=\"80\" fill=\"#bae6fd\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"1\" text-anchor=\"middle\">(UNCLE BOB)</text>\n        <line x1=\"75\" y1=\"88\" x2=\"225\" y2=\"88\" stroke=\"url(#cyan-code)\" stroke-width=\"1.2\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"22\" font-weight=\"800\" text-anchor=\"middle\">CLEAN CODE</text>\n        <text x=\"150\" y=\"305\" fill=\"#a5f3fc\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">AGILE SOFTWARE CRAFTSMANSHIP</text>\n        <text x=\"150\" y=\"335\" fill=\"#e0f2fe\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"500\" letter-spacing=\"1\" text-anchor=\"middle\">PRINCIPLES, PATTERNS &amp; PRACTICES</text>\n        <text x=\"150\" y=\"380\" fill=\"#a5f3fc\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Prentice Hall Professional Classic</text>\n      </svg>\n    ",
  "overview": "Robert C. Martin presents a revolutionary philosophy of software craftsmanship, explaining how to write readable code, design small cohesive functions, apply SOLID principles, and refactor mercilessly.",
  "chapters": [
    {
      "number": 1,
      "title": "Meaningful Names and Small Functions",
      "content": "\n          <p>Uncle Bob establishes that the ratio of time spent reading versus writing code is well over 10 to 1. Making code readable makes creating software significantly faster and less bug-prone.</p>\n          <p>Names of variables, classes, and methods should reveal intent without requiring explanatory comments. Functions should do one thing, do it well, and do it only. They should be small—rarely longer than 20 lines—and possess clear single levels of abstraction.</p>\n        "
    },
    {
      "number": 2,
      "title": "The SOLID Principles of Clean Architecture",
      "content": "\n          <p>Martin deconstructs the five foundational SOLID principles of software design:</p>\n          <ul>\n            <li><strong>Single Responsibility Principle (SRP):</strong> A class or module should have one, and only one, reason to change.</li>\n            <li><strong>Open/Closed Principle (OCP):</strong> Software entities should be open for extension, but closed for modification.</li>\n            <li><strong>Liskov Substitution Principle (LSP):</strong> Subtypes must be substitutable for their base types without altering system correctness.</li>\n            <li><strong>Interface Segregation Principle (ISP):</strong> Clients should not be forced to depend upon interfaces they do not use.</li>\n            <li><strong>Dependency Inversion Principle (DIP):</strong> High-level modules should depend on abstractions, not on low-level concretions.</li>\n          </ul>\n        "
    },
    {
      "number": 3,
      "title": "Unit Testing, Refactoring, and The Boy Scout Rule",
      "content": "\n          <p>Clean code requires the safety net of automated unit tests. Without tests, developers fear changing code, leading to software rot. Test-Driven Development (TDD) ensures code is decoupled and thoroughly verifiable.</p>\n          <p>Martin advocates the 'Boy Scout Rule': <em>Always leave the campground cleaner than you found it.</em> If every engineer checks in code slightly cleaner than when they checked it out, software systems grow healthier over time rather than decaying.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Code is written for human understanding first and execution second. Clean architecture, small functions, and automated testing are the hallmarks of professional engineering.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "the-pragmatic-programmer",
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt & David Thomas",
  "subtitle": "Your Journey to Mastery in Computer Science",
  "category": "Technology",
  "readTime": "8 min read",
  "themeColor": "#3730a3",
  "accentColor": "#818cf8",
  "shortDescription": "David Thomas and Andrew Hunt share classic wisdom on pragmatic architecture, debugging, automation, continuous learning, and software design.",
  "coverBadge": "Computer Science",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-prag\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#1e1b4b\"/>\n            <stop offset=\"0.5\" stop-color=\"#312e81\"/>\n            <stop offset=\"1\" stop-color=\"#3730a3\"/>\n          </linearGradient>\n          <linearGradient id=\"purple-prism\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#e0e7ff\"/>\n            <stop offset=\"50%\" stop-color=\"#818cf8\"/>\n            <stop offset=\"100%\" stop-color=\"#4f46e5\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-prag)\"/>\n        <!-- Multi-Faceted Crystal Prism / Compass Motif -->\n        <circle cx=\"150\" cy=\"165\" r=\"62\" fill=\"rgba(129, 140, 248, 0.12)\" stroke=\"url(#purple-prism)\" stroke-width=\"2\"/>\n        <!-- Prism Diamond Structure -->\n        <polygon points=\"150,118 190,150 150,212 110,150\" fill=\"none\" stroke=\"url(#purple-prism)\" stroke-width=\"2.5\"/>\n        <line x1=\"110\" y1=\"150\" x2=\"190\" y2=\"150\" stroke=\"#c7d2fe\" stroke-width=\"1.8\"/>\n        <line x1=\"150\" y1=\"118\" x2=\"150\" y2=\"212\" stroke=\"#c7d2fe\" stroke-width=\"1.8\"/>\n        <!-- Compass Points -->\n        <circle cx=\"150\" cy=\"165\" r=\"4\" fill=\"#ffffff\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"65\" fill=\"#c7d2fe\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">ANDREW HUNT &amp; DAVID THOMAS</text>\n        <line x1=\"60\" y1=\"75\" x2=\"240\" y2=\"75\" stroke=\"url(#purple-prism)\" stroke-width=\"1.2\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"18\" font-weight=\"800\" text-anchor=\"middle\">THE PRAGMATIC</text>\n        <text x=\"150\" y=\"302\" fill=\"#818cf8\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"18\" font-weight=\"800\" text-anchor=\"middle\">PROGRAMMER</text>\n        <text x=\"150\" y=\"332\" fill=\"#e0e7ff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"600\" letter-spacing=\"1\" text-anchor=\"middle\">JOURNEY TO MASTERY IN TECH</text>\n        <text x=\"150\" y=\"380\" fill=\"#c7d2fe\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Addison-Wesley Professional Milestone</text>\n      </svg>\n    ",
  "overview": "A beloved guide to modern programming principles, exploring pragmatism, DRY (Don't Repeat Yourself), orthogonality, continuous debugging, and maintaining curiosity across a technical career.",
  "chapters": [
    {
      "number": 1,
      "title": "A Pragmatic Philosophy: Care About Your Craft",
      "content": "\n          <p>Hunt and Thomas assert that true mastery starts with professional pride and personal responsibility. Pragmatic programmers don't leave broken windows—bad designs, wrong decisions, or poor code left unrepaired—because a single broken window rapidly invites deterioration of the entire software house.</p>\n          <p>They urge technologists to invest continuously in their knowledge portfolio: learning at least one new programming language every year, reading technical books, and questioning software industry dogmas.</p>\n        "
    },
    {
      "number": 2,
      "title": "Orthogonality and the DRY Principle",
      "content": "\n          <p>The authors coined the famous 'DRY' rule: <em>Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.</em> Duplication leads to maintenance nightmares when requirements evolve.</p>\n          <p>They also champion 'Orthogonality': designing components that are self-contained with well-defined single purposes. In an orthogonal system, changing one component does not create ripple bugs in unrelated subsystems, making architectures flexible and easy to refactor.</p>\n        "
    },
    {
      "number": 3,
      "title": "Ruthless Testing and Ruthless Automation",
      "content": "\n          <p>Pragmatic developers automate repetitive workflows. They use shell scripts, continuous integration pipelines, and reproducible builds to eliminate human error.</p>\n          <p>They also stress 'Tracer Bullets'—building small, end-to-end working skeletons of systems early to get real user feedback and validate architectural assumptions, rather than attempting overly complex theoretical designs in isolation.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Pragmatism combines craftsmanship, automation, and continuous learning. Eliminating duplication and building modular, orthogonal systems is the heart of software engineering.</p>\n          </div>\n        "
    }
  ]
},
{
  "id": "life-3-0",
  "title": "Life 3.0",
  "author": "Max Tegmark",
  "subtitle": "Being Human in the Age of Artificial Intelligence",
  "category": "Technology",
  "readTime": "8 min read",
  "themeColor": "#18181b",
  "accentColor": "#a855f7",
  "shortDescription": "MIT professor Max Tegmark explores the rise of artificial intelligence, neural architectures, automation, and how society can guide technology safely.",
  "coverBadge": "Artificial Intelligence",
  "coverIllustration": "\n      <svg viewBox=\"0 0 300 420\" class=\"book-cover-art\" xmlns=\"http://www.w3.org/2000/svg\">\n        <defs>\n          <linearGradient id=\"cov-grad-l3\" x1=\"0\" y1=\"0\" x2=\"300\" y2=\"420\" gradientUnits=\"userSpaceOnUse\">\n            <stop stop-color=\"#09090b\"/>\n            <stop offset=\"0.5\" stop-color=\"#18181b\"/>\n            <stop offset=\"1\" stop-color=\"#27272a\"/>\n          </linearGradient>\n          <linearGradient id=\"ai-glow\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#f0abfc\"/>\n            <stop offset=\"50%\" stop-color=\"#a855f7\"/>\n            <stop offset=\"100%\" stop-color=\"#6366f1\"/>\n          </linearGradient>\n        </defs>\n        <rect width=\"300\" height=\"420\" rx=\"16\" fill=\"url(#cov-grad-l3)\"/>\n        <!-- AI Neural Synapse Network Art -->\n        <circle cx=\"150\" cy=\"165\" r=\"62\" fill=\"rgba(168, 85, 247, 0.08)\" stroke=\"url(#ai-glow)\" stroke-width=\"2\"/>\n        <!-- Synapse Nodes & Interconnects -->\n        <circle cx=\"150\" cy=\"165\" r=\"14\" fill=\"#a855f7\"/>\n        <circle cx=\"110\" cy=\"140\" r=\"7\" fill=\"#6366f1\"/>\n        <circle cx=\"190\" cy=\"140\" r=\"7\" fill=\"#6366f1\"/>\n        <circle cx=\"120\" cy=\"190\" r=\"6\" fill=\"#f0abfc\"/>\n        <circle cx=\"180\" cy=\"190\" r=\"6\" fill=\"#f0abfc\"/>\n        <line x1=\"110\" y1=\"140\" x2=\"150\" y2=\"165\" stroke=\"url(#ai-glow)\" stroke-width=\"2\"/>\n        <line x1=\"190\" y1=\"140\" x2=\"150\" y2=\"165\" stroke=\"url(#ai-glow)\" stroke-width=\"2\"/>\n        <line x1=\"120\" y1=\"190\" x2=\"150\" y2=\"165\" stroke=\"url(#ai-glow)\" stroke-width=\"2\"/>\n        <line x1=\"180\" y1=\"190\" x2=\"150\" y2=\"165\" stroke=\"url(#ai-glow)\" stroke-width=\"2\"/>\n        <circle cx=\"150\" cy=\"165\" r=\"5\" fill=\"#ffffff\"/>\n        <!-- Header -->\n        <text x=\"150\" y=\"65\" fill=\"#e9d5ff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"3\" text-anchor=\"middle\">MAX TEGMARK</text>\n        <text x=\"150\" y=\"80\" fill=\"#a855f7\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"1\" text-anchor=\"middle\">MIT PROFESSOR OF PHYSICS</text>\n        <line x1=\"75\" y1=\"88\" x2=\"225\" y2=\"88\" stroke=\"url(#ai-glow)\" stroke-width=\"1.2\"/>\n        <!-- Titles -->\n        <text x=\"150\" y=\"275\" fill=\"#ffffff\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"24\" font-weight=\"800\" text-anchor=\"middle\">LIFE 3.0</text>\n        <text x=\"150\" y=\"305\" fill=\"#c084fc\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">BEING HUMAN IN THE AGE OF AI</text>\n        <text x=\"150\" y=\"335\" fill=\"#e4e4e7\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"11\" font-weight=\"500\" letter-spacing=\"1\" text-anchor=\"middle\">THE FUTURE OF MACHINE INTELLIGENCE</text>\n        <text x=\"150\" y=\"380\" fill=\"#a1a1aa\" font-family=\"'Plus Jakarta Sans', sans-serif\" font-size=\"10\" text-anchor=\"middle\">Penguin Random House Masterpiece</text>\n      </svg>\n    ",
  "overview": "MIT physicist Max Tegmark explores the profound frontiers of artificial intelligence, machine learning, and automation, asking how civilization can harness AI for human empowerment while aligning intelligent systems with human ethics.",
  "chapters": [
    {
      "number": 1,
      "title": "The Three Stages of Life",
      "content": "\n          <p>Tegmark categorizes the evolution of life into three distinct stages:</p>\n          <ul>\n            <li><strong>Life 1.0 (Biological stage):</strong> Organisms where both hardware and software are evolved, not designed (e.g. bacteria).</li>\n            <li><strong>Life 2.0 (Cultural stage):</strong> Organisms that can design their software—learning languages, cultures, and skills—while their hardware remains biological (e.g. humans).</li>\n            <li><strong>Life 3.0 (Technological stage):</strong> Entities that can redesign both their software and their hardware, which may arrive with advanced artificial general intelligence (AGI).</li>\n          </ul>\n        "
    },
    {
      "number": 2,
      "title": "Intelligence, Neural Networks, and Automation",
      "content": "\n          <p>Tegmark defines intelligence broadly as the 'ability to accomplish complex goals'. He reviews the exponential rise of deep neural networks, machine learning algorithms, and autonomous robotics in speech translation, cancer diagnostics, and scientific discovery.</p>\n          <p>Rather than fearing automation, he encourages societies to examine how AI can eliminate poverty, cure disease, and expand human creative potential if economic and educational systems evolve concurrently.</p>\n        "
    },
    {
      "number": 3,
      "title": "The Value Alignment Problem and the Future",
      "content": "\n          <p>The real danger of artificial superintelligence is not malice, but competence: a superintelligent system will be extremely effective at achieving its goals, and if those goals aren't aligned with humanity's core values, profound risks arise.</p>\n          <p>Tegmark calls on technologists, ethicists, and governments to cooperate globally on AI safety research, ensuring that artificial intelligence remains safe, transparent, and dedicated to elevating all human life.</p>\n          <div class=\"reading-key-takeaway\">\n            <h4>💡 Educational Takeaway</h4>\n            <p>Artificial intelligence is the defining technology of the 21st century. Proactive alignment of AI with ethics, safety, and human empowerment is crucial for our collective future.</p>\n          </div>\n        "
    }
  ]
}
];
