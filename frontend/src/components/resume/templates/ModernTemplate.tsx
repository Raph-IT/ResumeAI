import React from 'react';

interface ModernTemplateProps {
  preview?: boolean;
}

export const ModernTemplate = ({ preview = false }: ModernTemplateProps) => {
  const baseSize = preview ? 'text-[4px]' : 'text-base';
  const titleSize = preview ? 'text-[5px]' : 'text-lg';
  const subtitleSize = preview ? 'text-[3.5px]' : 'text-sm';
  const smallSize = preview ? 'text-[3px]' : 'text-xs';
  const imageSize = preview ? 'w-6 h-6' : 'w-24 h-24';
  const spacing = preview ? 'space-y-[2px]' : 'space-y-2';

  return (
    <div className="h-full w-full flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-[#1B2A41]">
        <div className={`h-full ${baseSize} text-white p-[4px] ${spacing}`}>
          {/* Photo et nom pour mobile */}
          <div className="flex flex-col items-center mb-2">
            <div className={`${imageSize} rounded-full overflow-hidden bg-gray-600 ring-2 ring-white/20`}>
              <img src="/profile-placeholder.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Contact avec icônes plus professionnels */}
          <div>
            <h2 className={`${titleSize} font-bold border-b border-white/20 pb-[1px] mb-1`}>CONTACT</h2>
            <div className={`${smallSize} space-y-[1px]`}>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <p>+123-456-7890</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <p>hello@reallygreatsite.com</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <p>San Francisco, CA</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <p>linkedin.com/in/rsanchez</p>
              </div>
            </div>
          </div>

          {/* Hard Skills avec barres de progression */}
          <div>
            <h2 className={`${titleSize} font-bold border-b border-white/20 pb-[1px] mb-1`}>HARD SKILLS</h2>
            <div className={`${smallSize} ${spacing}`}>
              <div className="space-y-[1px]">
                <div>
                  <div className="flex justify-between">
                    <span>Digital Marketing</span>
                    <span className="text-blue-400">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-[1px]">
                    <div className="bg-blue-400 h-full w-[95%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>SEO/SEM</span>
                    <span className="text-blue-400">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-[1px]">
                    <div className="bg-blue-400 h-full w-[90%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>Data Analytics</span>
                    <span className="text-blue-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-[1px]">
                    <div className="bg-blue-400 h-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h2 className={`${titleSize} font-bold border-b border-white/20 pb-[1px] mb-1`}>SOFT SKILLS</h2>
            <div className={`${smallSize} grid grid-cols-2 gap-1`}>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Leadership</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Problem Solving</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Communication</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Team Building</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className={`${titleSize} font-bold border-b border-white/20 pb-[1px] mb-1`}>EDUCATION</h2>
            <div className={`${smallSize} ${spacing}`}>
              <div>
                <div className="flex justify-between">
                  <p className="font-medium">MBA Marketing</p>
                  <span>2019</span>
                </div>
                <p className="text-gray-400">Stanford University</p>
                <p className="text-blue-400 text-[2.5px]">• Top 5% of class</p>
                <p className="text-blue-400 text-[2.5px]">• Marketing Innovation Award</p>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="font-medium">BSc Business</p>
                  <span>2017</span>
                </div>
                <p className="text-gray-400">UC Berkeley</p>
                <p className="text-blue-400 text-[2.5px]">• GPA: 3.95/4.0</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className={`${titleSize} font-bold border-b border-white/20 pb-[1px] mb-1`}>CERTIFICATIONS</h2>
            <div className={`${smallSize} space-y-[1px]`}>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Google Analytics Professional</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>HubSpot Marketing Expert</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Facebook Ads Specialist</span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className={`${titleSize} font-bold border-b border-white/20 pb-[1px] mb-1`}>LANGUAGES</h2>
            <div className={`${smallSize} space-y-[1px]`}>
              <div className="flex justify-between items-center">
                <span>English</span>
                <div className="flex gap-[0.5px]">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-[1px] h-[1px] bg-blue-400"></div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>French</span>
                <div className="flex gap-[0.5px]">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-[1px] h-[1px] bg-blue-400"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interests/Hobbies */}
          <div>
            <h2 className={`${titleSize} font-bold border-b border-white/20 pb-[1px] mb-1`}>INTERESTS</h2>
            <div className={`${smallSize} grid grid-cols-2 gap-1`}>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Tech Innovation</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>AI & ML</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Public Speaking</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-[2px] h-[2px] bg-blue-400 rounded-full"></span>
                <span>Blockchain</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 bg-white">
        <div className={`h-full ${baseSize} p-[4px]`}>
          <div className={spacing}>
            {/* Header avec titre plus impactant */}
            <div className="border-b-2 border-gray-200 pb-1">
              <h1 className={`${titleSize} font-bold text-gray-900 flex items-center gap-1`}>
                RICHARD <span className="font-normal">SANCHEZ</span>
                <span className={`${smallSize} text-blue-600 font-normal`}>(MBA, PMP)</span>
              </h1>
              <h2 className={`${subtitleSize} text-gray-600`}>
                SENIOR MARKETING MANAGER | DIGITAL STRATEGY EXPERT
              </h2>
            </div>

            {/* Profile avec mots-clés en gras */}
            <div>
              <h2 className={`${titleSize} font-bold text-gray-900 border-b border-gray-200 pb-[1px] mb-1`}>
                PROFILE
              </h2>
              <p className={`${smallSize} text-gray-600`}>
                Results-driven <span className="font-semibold">marketing leader</span> with 8+ years of experience in 
                <span className="font-semibold"> digital transformation</span> and 
                <span className="font-semibold"> team management</span>. Generated 
                <span className="font-semibold"> $10M+ in revenue</span> through strategic campaigns.
              </p>
            </div>

            {/* Expérience avec KPIs plus visibles */}
            <div>
              <h2 className={`${titleSize} font-bold text-gray-900 border-b border-gray-200 pb-[1px] mb-1`}>
                KEY EXPERIENCE
              </h2>
              <div className={`${smallSize} ${spacing}`}>
                <div>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Senior Marketing Manager</h3>
                      <p className="text-gray-600">Google</p>
                    </div>
                    <span className="text-gray-500">2021 - Present</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Led global marketing campaigns reaching 10M+ users</li>
                    <li>Managed $5M annual marketing budget with 125% ROI</li>
                    <li>Grew team from 5 to 15 members across 3 countries</li>
                    <li>Implemented data-driven strategy increasing conversions by 45%</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Marketing Manager</h3>
                      <p className="text-gray-600">Meta</p>
                    </div>
                    <span className="text-gray-500">2019 - 2021</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Developed integrated marketing strategies across platforms</li>
                    <li>Launched successful product marketing campaigns</li>
                    <li>Achieved 40% increase in brand engagement metrics</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Digital Marketing Specialist</h3>
                      <p className="text-gray-600">Apple</p>
                    </div>
                    <span className="text-gray-500">2017 - 2019</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Managed social media presence across platforms</li>
                    <li>Increased organic traffic by 85% through SEO optimization</li>
                    <li>Created content strategy reaching 1M+ monthly views</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Nouvelle section Projects */}
            <div>
              <h2 className={`${titleSize} font-bold text-gray-900 border-b border-gray-200 pb-[1px] mb-1`}>
                KEY PROJECTS
              </h2>
              <div className={`${smallSize} ${spacing}`}>
                <div>
                  <h3 className="font-semibold text-gray-900">Global Rebranding Initiative</h3>
                  <p className="text-gray-600">Led complete company rebranding, resulting in 85% increase in brand recognition</p>
                </div>
                {/* Autres projets... */}
              </div>
            </div>

            {/* Ajout de plus de projets */}
            <div className={`${smallSize} ${spacing}`}>
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Customer Segmentation</h3>
                <p className="text-gray-600">Implemented ML algorithms for customer segmentation, increasing conversion by 45%</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Marketing Automation Platform</h3>
                <p className="text-gray-600">Led development of in-house automation tools, reducing campaign setup time by 60%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 