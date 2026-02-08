import { Employee } from '../../types/employee';

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-500 transition-all">
      <div className="flex items-center space-x-4">
        {employee.photo_url ? (
          <img
            src={employee.photo_url}
            alt={employee.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {employee.name.charAt(0)}
            </span>
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
          {employee.position && (
            <p className="text-sm text-gray-600">{employee.position}</p>
          )}
          {employee.bio && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{employee.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}
