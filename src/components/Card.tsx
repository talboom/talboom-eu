import React from "react";

export interface CardProps {
  title: string | React.ReactNode;
  subtitle?: string;
  imageSrc?: string;
  list?: string[];
  description?: string;
  link?: { href: string; label: string };
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageSrc,
  list,
  description,
  link,
}) => (
  <div className="group mb-8">
    {/* Title with optional link styling */}
    <h3 className="text-lg font-medium text-gray-900 mb-2">
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
      <ul className="space-y-2 text-gray-700 text-sm mb-4">
        {list.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1.5 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Card;