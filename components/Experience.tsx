export default function Experience() {
  const experiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovators Inc.',
      location: 'San Francisco, CA',
      period: 'Jan 2024 - Present',
      description: 'Leading a team of 8 developers in building scalable web applications. Architecting cloud-native solutions and implementing CI/CD pipelines.',
      achievements: [
        'Reduced deployment time by 60% through automation',
        'Mentored 5 junior developers',
        'Implemented microservices architecture',
      ],
      current: true,
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      location: 'New York, NY',
      period: 'Mar 2022 - Dec 2023',
      description: 'Developed and maintained multiple client-facing applications using React, Node.js, and AWS.',
      achievements: [
        'Built 15+ production applications',
        'Improved app performance by 40%',
        'Led migration to TypeScript',
      ],
      current: false,
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Creative Web Agency',
      location: 'Remote',
      period: 'Jun 2020 - Feb 2022',
      description: 'Created responsive and interactive user interfaces for various client projects.',
      achievements: [
        'Delivered 20+ client projects',
        'Achieved 98% client satisfaction rate',
        'Introduced modern design systems',
      ],
      current: false,
    },
    {
      id: 4,
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      location: 'Boston, MA',
      period: 'Jan 2019 - May 2020',
      description: 'Contributed to various web development projects and learned industry best practices.',
      achievements: [
        'Collaborated with cross-functional teams',
        'Completed 100+ bug fixes and features',
        'Gained expertise in Agile methodology',
      ],
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-20" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          <p className="text-xl text-gray-300">My professional journey</p>
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
