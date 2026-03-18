export default function Experience() {
const experiences = [
    {
      id: 1,
      title: 'Deputy Program Secretary ',
      company: 'Skillup Club,HRDI',
      location: 'Daffodil International University',
      period: 'jun 2025 - Present',
      description: 'Organize events,Manage Events,Collaboration with Industry',
      achievements: [
        'Got dependable force Award',

      ],
      current: true,
    },
    {
      id: 2,
      title: 'Campus Ambassador',
      company: 'Netcom Learning Bangladesh.',
      location: 'Dhaka,Banagladesh',
      period: 'jul 2025 - jan 2026',
      description: 'Arrange AgentX a prompt engineering compitaion and engage students.',
      achievements: [
        'Best Volunteer Award',
      ],
      current: false,
    },
    {
      id: 3,
      title: 'Researcher',
      company: 'QRARG',
      location: 'Remote',
      period: 'Jun 2025 - present',
      description: 'Research and Development projects ',
      achievements: [
        'University Champion ',
        'Achieved 98% client satisfaction rate',
        'Introduced modern design systems',
      ],
      current: false,
    },
    {
      id: 4,
      title: 'DATA Analyst & AI Engineer',
      company: 'Black Mamba',
      location: 'Dhaka,Bangladesh',
      period: 'Jan 2024 - present',
      description: 'Integrate AI with Company',
      achievements: [
        'Collaborated with cross-functional teams',
        'Completed Machine Learning and Deep Learning',
        'Gained expertise in Agile methodology',
      ],
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-4" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            background: "linear-gradient(90deg, #555 0%, #fff 40%, #aaa 60%, #555 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite"
          }}>
            Experience
          </h2>
          <p className="text-lg sm:text-xl text-gray-300">My professional journey</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-700" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className={`relative flex items-center ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black shadow-lg z-10" style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }} />

                {/* Content card */}
                <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300" style={{ background: exp.current ? 'linear-gradient(90deg, #ff6b6b, #ffd93d)' : '#1a1a1a', border: exp.current ? 'none' : '1px solid #333' }}>
                    {exp.current && (
                      <span className="inline-block px-3 py-1 bg-white text-black text-xs font-semibold rounded-full mb-3">
                        Current Position
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-white font-semibold mb-1">{exp.company}</p>
                    <p className="text-sm text-white/80 mb-1">{exp.location}</p>
                    <p className="text-sm text-white/70 mb-4">{exp.period}</p>
                    <p className="text-white mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achIdx) => (
                        <div key={achIdx} className="flex items-start">
                          <span className="text-white mr-2">✓</span>
                          <span className="text-white text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
