import React from 'react';

export const MinimalTemplate = ({ data }: { data: any }) => {
  return (
    <div className="p-8 h-full bg-white text-gray-900">
      {/* En-tête */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {data.firstName} {data.lastName}
        </h1>
        <div className="text-gray-600">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
      </header>

      {/* Résumé */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Résumé</h2>
          <p className="text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Expérience */}
      {data.experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Expérience professionnelle</h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{exp.title}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
              </p>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Formation */}
      {data.education?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Formation</h2>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-sm text-gray-500">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Compétences */}
      {data.skills?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Compétences</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}; 