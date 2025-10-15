import React from "react";

export interface ResumeCardProps {
  title: string | React.ReactNode;
  subtitle?: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  list?: string[];
  description?: string;
  link?: { href: string; label: string };
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  subtitle,
  image,
  list,
  description,
  link,
}) => (
  <div className="group mb-8">
    {/* Title with optional image and link styling */}
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      <div className="flex items-center gap-3">
        {image && (
          <img
            src={image.src}
            alt={image.alt}
            width={image.width || 24}
            height={image.height || 24}
            className="flex-shrink-0"
          />
        )}
        <span>
          {link ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              {title} →
            </a>
          ) : (
            title
          )}
        </span>
      </div>
    </h3>

    {/* Subtitle */}
    {subtitle && (
      <p className="text-gray-600 font-medium text-sm mb-3">{subtitle}</p>
    )}

    {/* Description */}
    {description && (
      <p className="text-gray-600 text-sm mb-4">{description}</p>
    )}

    {/* List items */}
    {list && list.length > 0 && (
      <ul className="space-y-1 text-gray-700 text-sm mb-4">
        {list.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ResumeCard;