import React from 'react';
import ReactMarkdown from 'react-markdown';
import { candidateData } from '../data/mock';
import { GraduationCap, Briefcase, User, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const CandidateProfile = () => {
  return (
    <section id="candidate" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Profil Calon Pendeta
          </h2>
          <p className="text-lg text-gray-600">Mengenal lebih dekat calon pendeta GKJ Pamulang</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo Section */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                  <img 
                    src="/faisha.jpg" 
                    alt={candidateData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 text-center">
                    {candidateData.name}
                  </h3>
                  <p className="text-center text-gray-600 mt-2">Calon Pendeta GKJ Pamulang</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Tentang
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 leading-relaxed text-justify">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                      ul: ({ children }) => <ul className="my-3 space-y-2 list-disc list-inside">{children}</ul>,
                      li: ({ children }) => <li className="ml-4">{children}</li>,
                      h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-3 first:mt-0">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-bold mt-4 mb-3 first:mt-0">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-base font-bold mt-3 mb-2 first:mt-0">{children}</h3>,
                      h4: ({ children }) => <h4 className="text-base font-semibold mt-3 mb-2 first:mt-0">{children}</h4>,
                      h5: ({ children }) => <h5 className="text-sm font-semibold mt-3 mb-2 first:mt-0">{children}</h5>,
                      h6: ({ children }) => <h6 className="text-sm font-medium mt-3 mb-2 first:mt-0">{children}</h6>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 my-3 italic">{children}</blockquote>,
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>
                    }}
                  >
                    {candidateData.bio}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Pendidikan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {candidateData.education.map((edu, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Pengalaman Pelayanan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {candidateData.experience.map((exp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{exp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CV */}
            {/* <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Curriculum Vitae
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">CV Lengkap</p>
                  <p className="text-sm text-gray-500">File CV akan ditambahkan oleh admin</p>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  );
};