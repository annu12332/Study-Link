import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaGraduationCap,
  FaGlobe,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const res = await axios.get("https://studylinkserver.thinkcodify.site/api/reviews/approved");
      if (res.data.success) {
        setStories(res.data.data.slice(0, 5)); // limit 5
      }
    } catch (err) {
      console.error("Error fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 px-4 md:px-8 overflow-hidden">
      {/* Background decor */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 text-xs font-black tracking-[0.25em] uppercase block mb-3">
            Testimonials
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
            Global <span className="text-blue-600 italic">Impact</span>
          </h2>

          <p className="text-slate-500 mt-3 text-sm max-w-xl mx-auto">
            Real stories from students who successfully achieved their dream of
            studying abroad through Study Link Ltd.
          </p>

          <Link
            to="/all-stories"
            className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-blue-600 hover:text-slate-900 transition"
          >
            View All Alumni <FaArrowRight size={12} />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-slate-100 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {stories.map((story, index) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer bg-white border border-slate-100 p-5 rounded-2xl shadow-md hover:shadow-xl hover:shadow-blue-100 transition-all"
              >
                {/* User */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-blue-50 flex items-center justify-center font-black text-blue-600 text-lg">
                    {story.image ? (
                      <img
                        src={story.image}
                        className="w-full h-full object-cover"
                        alt={story.name}
                      />
                    ) : (
                      <span>{story.name[0]}</span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase leading-none">
                      {story.name}
                    </h4>

                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider flex items-center gap-1 mt-1">
                      <FaGraduationCap size={10} />
                      {story.country}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-4">
                  <FaQuoteLeft className="absolute -top-1 -left-1 text-blue-200 text-lg" />
                  <p className="text-xs text-slate-600 leading-relaxed italic pl-4 line-clamp-3">
                    {story.quote || story.message}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xs ${
                        i < (story.rating || 5)
                          ? "text-orange-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedStory(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white max-w-md w-full rounded-3xl shadow-2xl overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition"
                >
                  <FaTimes size={12} />
                </button>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xl">
                      {selectedStory.image ? (
                        <img
                          src={selectedStory.image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : (
                        <span>{selectedStory.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase italic leading-none">
                        {selectedStory.name}
                      </h3>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">
                        {selectedStory.university || "Verified Alumni"}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                    "{selectedStory.quote || selectedStory.message}"
                  </p>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {selectedStory.details ||
                      "This student successfully processed their visa through Study Link Ltd and is now pursuing higher studies abroad."}
                  </p>

                  <div className="mt-6 pt-4 border-t flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                      <FaGlobe size={10} />
                      {selectedStory.course || "Higher Studies"}
                    </div>

                    <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold uppercase">
                      {selectedStory.country} Visa
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SuccessStories;