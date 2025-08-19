"use client";

import { ShareIcon } from '@heroicons/react/24/outline'; // or your own icon

import { useState } from "react";

import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const ShareButtonWithFallback = () => {
  const [showOptions, setShowOptions] = useState(false);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this page!",
      url: pageUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share canceled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(pageUrl);
        alert("Link copied to clipboard!");
        setShowOptions(true); // Show social icons after fallback
      } catch (err) {
        alert("Failed to copy link.");
      }
    }
  };

  const encodedUrl = encodeURIComponent(pageUrl);
  const socialLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaInstagram />,
      label: "Facebook",
    },
    {
      href: `https://wa.me/?text=${encodedUrl}`,
      icon: <FaYoutube />,
      label: "WhatsApp",
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FaLinkedinIn />,
      label: "LinkedIn",
    },
  ];

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        className="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition duration-200 shadow-md ring-1 ring-white/20"
      >
        <ShareIcon className="h-6 w-6 text-white" />
        Share
      </button>

      {showOptions && (
        <div className="absolute left-0 mt-2 flex gap-2 p-2 rounded-lg bg-white/10 backdrop-blur-md ring-1 ring-white/20 shadow-lg z-10">
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-400 transition"
              title={`Share on ${label}`}
            >
              {icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareButtonWithFallback;
