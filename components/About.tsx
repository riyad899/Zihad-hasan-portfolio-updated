export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20" style={{ background: '#000000' }}>
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
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-gray-300">Get to know me better</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Vipimages/image.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 sm:w-64 sm:h-64 bg-blue-600 rounded-full opacity-10 -z-10" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Hi, I&apos;m a passionate Software Engineering student & AI enthusiast
            </h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              With a strong foundation in programming and data-driven technologies, I am dedicated to building intelligent and impactful solutions. My journey in tech started with curiosity about how systems work and has evolved into a passion for software development, data analysis, and machine learning.
            </p>

            <div className="text-base sm:text-lg text-gray-300 leading-relaxed">
              <p className="font-semibold text-white mb-3">I specialize in:</p>
              <ul className="space-y-2 ml-4">
                <li><span className="text-yellow-400">•</span> <strong>Programming:</strong> Java, C, Python, SQL</li>
                <li><span className="text-yellow-400">•</span> <strong>Data Science & Visualization:</strong> NumPy, Pandas, Matplotlib, Seaborn</li>
                <li><span className="text-yellow-400">•</span> <strong>Machine Learning & Deep Learning:</strong> TensorFlow, PyTorch</li>
                <li><span className="text-yellow-400">•</span> <strong>AI & Data Analytics</strong></li>
                <li><span className="text-yellow-400">•</span> <strong>Graphics Design:</strong> Illustrator, Canva, Photoshop</li>
              </ul>
            </div>


            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div className="p-3 sm:p-4 rounded-lg shadow" style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}>
                <p className="text-2xl sm:text-3xl font-bold text-white">6+</p>
                <p className="text-white text-xs sm:text-sm">Leadership & Volunteer Roles</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg shadow" style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}>
                <p className="text-2xl sm:text-3xl font-bold text-white">5+</p>
                <p className="text-white text-xs sm:text-sm">Professional Certifications</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg shadow" style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}>
                <p className="text-2xl sm:text-3xl font-bold text-white">8+</p>
                <p className="text-white text-xs sm:text-sm">Technologies & Libraries</p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg shadow" style={{ background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)' }}>
                <p className="text-2xl sm:text-3xl font-bold text-white">5+</p>
                <p className="text-white text-xs sm:text-sm">Years of Tech Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
