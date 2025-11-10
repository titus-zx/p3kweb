import React from 'react';
import { timelineData } from '../data/mock';
import { CheckCircle, Circle, Star } from 'lucide-react';

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
                  <div className={`rounded-lg border-2 p-6 ${getColorClass(item.color)} transition-all hover:shadow-lg`}>
                    <div className="flex items-start gap-3 mb-3">
                      {item.current ? (
                        <Star className="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" />
                      ) : index < 3 ? (
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-sm mb-1">{item.date}</div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              {timelineData.slice(3, 6).map((item, index) => (
                <div key={index} className="relative">
                  <div className={`rounded-lg border-2 p-6 ${getColorClass(item.color)} transition-all hover:shadow-lg`}>
                    <div className="flex items-start gap-3 mb-3">
                      {item.current ? (
                        <Star className="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" />
                      ) : index < 3 ? (
                        <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-sm mb-1">{item.date}</div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-300 rotate-180"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              {timelineData.slice(6).map((item, index) => (
                <div key={index} className="relative">
                  <div className={`rounded-lg border-2 p-6 ${getColorClass(item.color)} transition-all hover:shadow-lg`}>
                    <div className="flex items-start gap-3 mb-3">
                      {item.current ? (
                        <Star className="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" />
                      ) : (
                        <Circle className="w-5 h-5 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-sm mb-1">{item.date}</div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm">{item.description}</p>
                  </div>
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
                <div className={`rounded-lg border-2 p-4 ${getColorClass(item.color)}`}>
                  <div className="font-bold text-sm mb-1">{item.date}</div>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <Star className="w-5 h-5 text-red-600" fill="currentColor" />
            <span className="text-sm font-medium text-red-700">Proses Saat Ini</span>
          </div>
        </div>
      </div>
    </section>
  );
};