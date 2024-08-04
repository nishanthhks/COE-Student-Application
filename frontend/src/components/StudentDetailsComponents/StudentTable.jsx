// Component to render student data
export function StudentTable({ filteredData }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">USN</th>
              <th className="py-2 px-4 border-b">Semester</th>
              <th className="py-2 px-4 border-b">Section</th>
              <th className="py-2 px-4 border-b">Branch</th>
              <th className="py-2 px-4 border-b">Aadhar Number</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Father's Name</th>
              <th className="py-2 px-4 border-b">Father's Occupation</th>
              <th className="py-2 px-4 border-b">Father's Phone Number</th>
              <th className="py-2 px-4 border-b">Mother's Name</th>
              <th className="py-2 px-4 border-b">Mother's Occupation</th>
              <th className="py-2 px-4 border-b">Mother's Phone Number</th>
              <th className="py-2 px-4 border-b">10th Marks</th>
              <th className="py-2 px-4 border-b">12th Marks</th>
            </tr>
          </thead>
          {filteredData.length > 0 ? (
            <tbody>
              {filteredData.map((student, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.usn}</td>
                  <td className="py-2 px-4 border-b">{student.semester}</td>
                  <td className="py-2 px-4 border-b">{student.section}</td>
                  <td className="py-2 px-4 border-b">{student.branch}</td>
                  <td className="py-2 px-4 border-b">
                    {student.aadhar_number}
                  </td>
                  <td className="py-2 px-4 border-b">{student.address}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">{student.fathers_name}</td>
                  <td className="py-2 px-4 border-b">
                    {student.fathers_occupation}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.fathers_phone_number}
                  </td>
                  <td className="py-2 px-4 border-b">{student.mothers_name}</td>
                  <td className="py-2 px-4 border-b">
                    {student.mothers_occupation}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.mothers_phone_number}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={`http://localhost:4000/pdf/${student.id}/tenth`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-red-500 rounded p-1 px-3 hover:bg-red-600 ">
                      View
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={`http://localhost:4000/pdf/${student.id}/twelfth`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-red-500 rounded p-1 px-3 hover:bg-red-600">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="w-64 m-auto flex flex-row justify-center">
              <p className="text-gray-500 mx-auto text-center ">
                <center>No students found</center>
              </p>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
