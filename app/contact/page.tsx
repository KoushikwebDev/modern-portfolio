"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import personalinfo from "@/lib/personalInfo";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);

    // Save form data to a file
    const fileData = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(fileData);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact-form-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Show popup and reset form
    setShowPopup(true);
    reset();
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="w-full max-w-lg bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input {...register("name")} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input {...register("email")} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500" placeholder="Your Email" />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea {...register("message")} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500" rows={4} placeholder="Your Message"></textarea>
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded-lg"
          >
            Send Message
          </motion.button>
        </form>

        {/* Success Popup */}
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-20 right-10 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            ✅ Thank you! Your message has been sent.
          </motion.div>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6">
          <a href={`mailto:${personalinfo.email}`} className="text-gray-300 hover:text-blue-400 transition">
            <Mail size={24} />
          </a>
          <a href={personalinfo.linkedin} target="_blank" className="text-gray-300 hover:text-blue-400 transition">
            <Linkedin size={24} />
          </a>
          <a href={personalinfo.github} target="_blank" className="text-gray-300 hover:text-blue-400 transition">
            <Github size={24} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
