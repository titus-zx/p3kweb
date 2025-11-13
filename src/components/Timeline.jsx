import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { timelineData } from '../data/mock';
import { CheckCircle, Circle, Star, ChevronDown, ChevronUp } from 'lucide-react';

const TimelineCard = ({ item, index, showIcon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxHeight = 150; // pixels
  const isLongContent = item.description.length > 200; // character threshold

  const getColorClass = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-300',
      red: 'bg-red-100 text-red-700 border-red-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className={`rounded-lg border-2 p-6 ${getColorClass(item.color)} transition-all hover:shadow-lg h-full flex flex-col`}>
      <div className="flex items-start gap-3 mb-3">
        {item.current ? (
          <Star className="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" />
        ) : showIcon ? (
          <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
        ) : (
          <Circle className="w-5 h-5 mt-1 flex-shrink-0" />
        )}
        <div>
          <div className="font-bold text-sm mb-1">{item.date}</div>
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
        </div>
      </div>
      <div className="relative flex-grow">
        <div 
          className={`text-sm overflow-hidden transition-all duration-300 ${
            !isExpanded && isLongContent ? 'max-h-[150px]' : 'max-h-none'
          }`}
          style={!isExpanded && isLongContent ? { 
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          } : {}}
        >
          <div className="prose prose-sm max-w-none prose-headings:text-current prose-p:text-current prose-ul:text-current prose-li:text-current prose-strong:text-current prose-blockquote:text-current text-justify">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="my-2 space-y-1 list-disc list-inside">{children}</ul>,
                li: ({ children }) => <li className="ml-4">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mt-3 mb-2 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-2 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1 first:mt-0">{children}</h3>,
                h4: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1 first:mt-0">{children}</h4>,
                h5: ({ children }) => <h5 className="text-xs font-semibold mt-2 mb-1 first:mt-0">{children}</h5>,
                h6: ({ children }) => <h6 className="text-xs font-medium mt-2 mb-1 first:mt-0">{children}</h6>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-current bg-current bg-opacity-5 pl-3 py-2 my-2 italic">{children}</blockquote>
              }}
            >
              {item.description}
            </ReactMarkdown>
          </div>
        </div>
        {isLongContent && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center gap-1 text-xs font-semibold hover:underline focus:outline-none"
          >
            {isExpanded ? (
              <>
                Lebih sedikit <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Selengkapnya <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const MobileTimelineCard = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongContent = item.description.length > 200;

  const getColorClass = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-300',
      red: 'bg-red-100 text-red-700 border-red-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${getColorClass(item.color)}`}>
      <div className="font-bold text-sm mb-1">{item.date}</div>
      <h3 className="font-bold text-base mb-2">{item.title}</h3>
      <div className="relative">
        <div
          className={`text-sm overflow-hidden transition-all duration-300 ${
            !isExpanded && isLongContent ? 'max-h-[150px]' : 'max-h-none'
          }`}
          style={!isExpanded && isLongContent ? {
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          } : {}}
        >
          <div className="prose prose-sm max-w-none prose-headings:text-current prose-p:text-current prose-ul:text-current prose-li:text-current prose-strong:text-current prose-blockquote:text-current text-justify">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="my-2 space-y-1 list-disc list-inside">{children}</ul>,
                li: ({ children }) => <li className="ml-4">{children}</li>,
                h1: ({ children }) => <h1 className="text-lg font-bold mt-3 mb-2 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-2 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1 first:mt-0">{children}</h3>,
                h4: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1 first:mt-0">{children}</h4>,
                h5: ({ children }) => <h5 className="text-xs font-semibold mt-2 mb-1 first:mt-0">{children}</h5>,
                h6: ({ children }) => <h6 className="text-xs font-medium mt-2 mb-1 first:mt-0">{children}</h6>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-current bg-current bg-opacity-5 pl-3 py-2 my-2 italic">{children}</blockquote>
              }}
            >
              {item.description}
            </ReactMarkdown>
          </div>
        </div>
        {isLongContent && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center gap-1 text-xs font-semibold hover:underline focus:outline-none"
          >
            {isExpanded ? (
              <>
                Lebih sedikit <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Selengkapnya <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export const Timeline = () => {
  const getColorClass = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-300',
      red: 'bg-red-100 text-red-700 border-red-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300'
    };
    return colors[color] || colors.green;
  };

  return (
    <section id="timeline" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tahapan Pemanggilan Pendeta Kedua
          </h2>
          <p className="text-lg text-gray-600">Proses pemanggilan pendeta dilakukan secara transparan dan sistematis</p>
        </div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-8 mb-12">
              {timelineData.slice(0, 3).map((item, index) => (
                <div key={index} className="relative">
                  <TimelineCard item={item} index={index} showIcon={true} />
                  {index < 2 && (
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              {timelineData.slice(3, 6).map((item, index) => (
                <div key={index} className="relative">
                  <TimelineCard item={item} index={index} showIcon={true} />
                  {index < 2 && (
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-300 rotate-180"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              {timelineData.slice(6).map((item, index) => (
                <div key={index} className="relative">
                  <TimelineCard item={item} index={index} showIcon={false} />
                  {index < 2 && (
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {timelineData.map((item, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  {item.current ? (
                    <Star className="w-4 h-4 text-white" fill="currentColor" />
                  ) : index < 6 ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Circle className="w-4 h-4 text-white" />
                  )}
                </div>
                {index < timelineData.length - 1 && (
                  <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gray-300"></div>
                )}
                <MobileTimelineCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};