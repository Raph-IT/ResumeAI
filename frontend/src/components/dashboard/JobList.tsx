import React from 'react';
import type { JobApplication } from '../../types';
import { Clock, CheckCircle, XCircle, MessageCircle } from 'lucide-react';

const statusIcons = {
  pending: Clock,
  applied: MessageCircle,
  interviewing: MessageCircle,
  rejected: XCircle,
  accepted: CheckCircle,
};

interface JobListProps {
  applications: JobApplication[];
}

export default function JobList({ applications }: JobListProps) {
  return (
    <div className="space-y-4">
      {applications.map((job) => {
        const StatusIcon = statusIcons[job.status];
        return (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{job.position}</h3>
              <p className="text-gray-600">{job.company}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`flex items-center space-x-2 ${
                job.status === 'accepted' ? 'text-green-600' :
                job.status === 'rejected' ? 'text-red-600' :
                'text-blue-600'
              }`}>
                <StatusIcon className="h-5 w-5" />
                <span className="capitalize">{job.status}</span>
              </span>
              <span className="text-gray-500">
                {new Date(job.dateApplied).toLocaleDateString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}