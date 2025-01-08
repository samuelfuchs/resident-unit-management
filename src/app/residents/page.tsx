"use client";

import React from "react";
import { mockResidents } from "@/mocks/residents";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";

const ResidentsPage: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AuthLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Perfis de Residentes</h1>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockResidents.map((resident) => (
              <div key={resident.id} className="bg-white p-4 shadow rounded-lg">
                <div className="flex items-center mb-4">
                  {resident.profilePicture ? (
                    <img
                      src={resident.profilePicture}
                      alt={`${resident.name} ${resident.lastName}`}
                      className="h-12 w-12 rounded-full shadow"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 font-bold">
                        {resident.name.charAt(0)}
                        {resident.lastName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="ml-4">
                    <p className="font-bold">{`${resident.name} ${resident.lastName}`}</p>
                    <p className="text-sm text-gray-500">{resident.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Telefone:</span>{" "}
                  {resident.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">E-mail:</span>{" "}
                  {resident.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Unidade:</span>{" "}
                  {resident.unitId}
                </p>
              </div>
            ))}
          </div> */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold text-gray-900">Users</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your account including their name,
                  title, email and role.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add user
                </button>
              </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {mockResidents.map((person) => (
                    <tr key={person.email}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                        {person.name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Title</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            {person.id}
                          </dd>
                          <dt className="sr-only sm:hidden">Email</dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {person.email}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {person.email}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {person.email}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default ResidentsPage;
