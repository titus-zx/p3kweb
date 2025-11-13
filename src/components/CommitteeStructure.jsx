import React from 'react';
import { Users, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const CommitteeStructure = () => {
  const committeeData = {
    dasarPenetapan: [
      {
        title: "Keputusan Majelis GKJ Pamulang",
        details: "No.: Kep-30/MG/GKJP/X/2024 tanggal 1 Oktober 2024"
      },
      {
        title: "Adendum Keputusan Majelis GKJ Pamulang", 
        details: "No.: KEP-ADD01/MG/GKJP/IV/2025 tanggal 1 April 2025"
      }
    ],
    tugasPokok: "Melaksanakan pemanggilan Pendeta sesuai Pokok-pokok Ajaran Gereja Kristen Jawa, Tata Gereja dan Tata Laksana Gereja Kristen Jawa",
    masaBakti: {
      start: "November 2024",
      end: "July 2027"
    },
    panitiaInti: [
      { position: "Ketua", name: "Bangun Wibowo" },
      { position: "Wakil Ketua", name: "Ery Setiawan" },
      { position: "Sekretaris I", name: "Eko Kurniyanto" },
      { position: "Sekretaris II", name: "Merry Christiana" },
      { position: "Bendahara I", name: "Kristiena E Parikesit" },
      { position: "Bendahara II", name: "Finny Yunita Heru" }
    ],
    bidangKesekretariatan: {
      coordinator: "Bidang Kesekretariatan",
      members: [
        "Titus Adi Prasetyo"
      ]
    },
    bidangKomunikasi: {
      coordinator: "Bidang Komunikasi & Informasi",
      members: [
        "Harry Anggoro",
        "Trami S. Trijogo", 
        "Sayogo Suprianto",
        "Andrianto Nataladi",
        "Maria F. Stefanus"
      ]
    },
    bidangAsesmen: {
      coordinator: "Bidang Asesmen",
      members: [
        "Florencia Irena Diaz",
        "Rudhistya Kurniyanto"
      ]
    },
    bidangIT: {
      coordinator: "Bidang IT & Litbang",
      members: [
        "Yehezkiel W. Andri",
        "Johannes Munthe"
      ]
    },
    bidangKeuangan: {
      coordinator: "Bidang Keuangan dan Usaha Dana",
      members: [
        "Andreas Bambang Purwanto",
        "Kristini S. Rudi",
        "Andreas Bayu Dewanto"
      ]
    },
    bidangPrasarana: {
      coordinator: "Bidang Prasarana dan Sarana",
      members: ["Samuel Yogasara"]
    },
    contact: {
      phone: "0857 1871 2605",
      email: "pppkgkjp@gmail.com",
      address: "Jln. Raya Siliwangi No. 7, Pamulang Barat, Pamulang, Tangerang Selatan"
    }
  };

  const SectionCard = ({ title, children, className = "" }) => (
    <Card className={`shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );

  const PersonCard = ({ position, name, className = "" }) => (
    <div className={`bg-gray-50 rounded-lg p-4 text-center ${className}`}>
      <div className="font-semibold text-gray-800 text-sm mb-1">{position}</div>
      <div className="text-gray-700 font-medium">{name}</div>
    </div>
  );

  return (
    <section id="committee" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Users className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Susunan Panitia Pemanggilan Pendeta
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gereja Kristen Jawa Pamulang
          </p>
        </div>

        <div className="grid gap-8">
          {/* Dasar Penetapan */}
          <SectionCard title="Dasar Penetapan">
            <div className="space-y-4">
              {committeeData.dasarPenetapan.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.details}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Tugas Pokok & Masa Bakti */}
          <div className="grid md:grid-cols-2 gap-8">
            <SectionCard title="Tugas Pokok">
              <p className="text-gray-700 leading-relaxed">
                {committeeData.tugasPokok}
              </p>
            </SectionCard>

            <SectionCard title="Masa Bakti">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {committeeData.masaBakti.start} s.d {committeeData.masaBakti.end}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Panitia Inti */}
          <SectionCard title="Panitia Inti">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {committeeData.panitiaInti.map((member, index) => (
                <PersonCard 
                  key={index} 
                  position={member.position} 
                  name={member.name}
                />
              ))}
            </div>
          </SectionCard>

          {/* Anggota - Bidang-bidang */}
          <SectionCard title="Anggota">
            <div className="space-y-8">
              {/* Bidang Kesekretariatan */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">{committeeData.bidangKesekretariatan.coordinator}</h4>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-gray-700 font-medium">Titus Adi Prasetyo</div>
                </div>
              </div>

              {/* Bidang Komunikasi & Informasi */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">{committeeData.bidangKomunikasi.coordinator}</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {committeeData.bidangKomunikasi.members.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-gray-700">{member}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bidang Asesmen */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">{committeeData.bidangAsesmen.coordinator}</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {committeeData.bidangAsesmen.members.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-gray-700">{member}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bidang IT & Litbang */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">{committeeData.bidangIT.coordinator}</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {committeeData.bidangIT.members.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-gray-700">{member}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bidang Keuangan dan Usaha Dana */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">{committeeData.bidangKeuangan.coordinator}</h4>
                <div className="grid md:grid-cols-3 gap-3">
                  {committeeData.bidangKeuangan.members.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-gray-700">{member}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bidang Prasarana dan Sarana */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">{committeeData.bidangPrasarana.coordinator}</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {committeeData.bidangPrasarana.members.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-gray-700">{member}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
};