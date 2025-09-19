import React from 'react';

export interface Guest {
  id: number;
  name: string;
  isattending: boolean;
  created_at?: string;
}

interface GuestsTabProps {
  guests: Guest[];
}

export const GuestsTab: React.FC<GuestsTabProps> = ({ guests }) => {
  return (
    <div>
      <h2 className="text-3xl font-light text-gray-900 mb-10">Lista de Convidados</h2>
      
      <div className="bg-white rounded-none border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Convidado
              </th>
              <th className="px-8 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-8 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Data de Confirmação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guests.map((guest) => (
              <tr key={guest.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-8 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      guest.isattending
                        ? "bg-gray-100 text-gray-800 border border-gray-300"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {guest.isattending ? "✅ Confirmado" : "⏳ Pendente"}
                  </span>
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                  {guest.created_at
                    ? new Date(guest.created_at).toLocaleDateString("pt-BR")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
