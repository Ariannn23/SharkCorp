import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Video compartido para todas las cards (coloca el archivo en public/videos/)
const PROJECT_VIDEO = "/videos/demo.mp4";

// Project Card Component
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -8);
    setRotateY(((x - centerX) / centerX) * 8);
  };

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={project.slug}
      className="group relative bg-shark-900 border border-white/5 rounded-sm overflow-hidden hover:border-shark-accent/30 transition-colors"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Image + Video on hover */}
      <div className="aspect-video w-full overflow-hidden relative bg-[#0a0f14]">
        {/* Placeholder SVG — tamaño de fuente fijo para todos */}
        {project.data.image.includes("placehold.co") ? (
          <svg
            className="absolute inset-0 w-full h-full z-0 pointer-events-none group-hover:opacity-0 transition-opacity duration-500"
            viewBox="0 0 600 338"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width="600" height="338" fill="#0a0f14" />
            {/* Grid lines decorativas */}
            <line
              x1="0"
              y1="169"
              x2="600"
              y2="169"
              stroke="#00E5FF"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
            <line
              x1="300"
              y1="0"
              x2="300"
              y2="338"
              stroke="#00E5FF"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
            <text
              x="300"
              y="185"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#00E5FF"
              fontSize="44"
              fontFamily="'Space Grotesk', 'Inter', sans-serif"
              fontWeight="300"
              letterSpacing="8"
            >
              {/* Extraer el texto del parámetro text= de la URL */}
              {decodeURIComponent(
                (project.data.image.match(/text=([^&"]+)/) || [
                  "",
                  project.data.title,
                ])[1].replace(/\+/g, " "),
              )}
            </text>
          </svg>
        ) : (
          <img
            src={project.data.image}
            alt={project.data.title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 group-hover:opacity-0 transition-all duration-500"
          />
        )}
        {/* Video que aparece al hacer hover */}
        <video
          ref={videoRef}
          src={PROJECT_VIDEO}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute top-3 right-3 z-30 bg-shark-950/80 backdrop-blur-sm px-2 py-1 rounded-sm text-[10px] text-shark-accent uppercase tracking-wider border border-shark-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Video Preview
        </div>
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-shark-950 via-shark-950/40 to-transparent" />
      </div>

      {/* Content - always visible on mobile, slides up on desktop hover */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.data.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider px-2 py-1 bg-shark-950/80 border border-white/10 text-shark-accent rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-display text-white mb-2 leading-tight group-hover:text-shark-accent transition-colors duration-300">
          {project.data.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {project.data.description}
        </p>

        {/* Link */}
        <a
          href={project.data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link relative inline-flex items-center gap-2 text-sm font-bold text-shark-accent uppercase tracking-widest transition-colors duration-300 hover:text-white"
        >
          <span className="relative">
            Ver Proyecto
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-shark-accent group-hover/link:w-full transition-all duration-300" />
          </span>
          <span className="transform transition-transform duration-300 group-hover/link:translate-x-2">
            →
          </span>
        </a>
      </div>
    </motion.article>
  );
}

export default function ProjectCatalog({ projects }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web", "Mobile", "SaaS"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.data.category === filter);

  return (
    <section id="projects" className="py-24 px-6 bg-shark-950 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              PROYECTOS
            </h2>
            <p className="text-gray-400">
              Ingeniería aplicada a soluciones reales.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm font-bold uppercase tracking-widest border transition-all duration-300 rounded-sm ${
                  filter === cat
                    ? "bg-shark-accent text-shark-950 border-shark-accent"
                    : "border-white/10 text-gray-400 hover:border-shark-accent hover:text-shark-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="contents"
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
