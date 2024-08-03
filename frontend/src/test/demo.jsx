// const StudentTable = ({ filteredData }) => {
//   return filteredData.length > 0 ? (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Name</th>
//             <th className="py-2 px-4 border-b">USN</th>
//             <th className="py-2 px-4 border-b">Semester</th>
//             <th className="py-2 px-4 border-b">Section</th>
//             <th className="py-2 px-4 border-b">Branch</th>
//             <th className="py-2 px-4 border-b">Aadhar Number</th>
//             <th className="py-2 px-4 border-b">Address</th>
//             <th className="py-2 px-4 border-b">Email</th>
//             <th className="py-2 px-4 border-b">10th Marks</th>
//             <th className="py-2 px-4 border-b">12th Marks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((student, index) => (
//             <tr
//               key={index}
//               className={`${
//                 index % 2 === 0 ? "bg-gray-100" : "bg-white"
//               } hover:bg-gray-200`}>
//               <td className="py-2 px-4 border-b">{student.name}</td>
//               <td className="py-2 px-4 border-b">{student.usn}</td>
//               <td className="py-2 px-4 border-b">{student.semester}</td>
//               <td className="py-2 px-4 border-b">{student.section}</td>
//               <td className="py-2 px-4 border-b">{student.branch}</td>
//               <td className="py-2 px-4 border-b">{student.aadharNumber}</td>
//               <td className="py-2 px-4 border-b">{student.address}</td>
//               <td className="py-2 px-4 border-b">{student.email}</td>
//               <td className="py-2 px-4 border-b">
//                 <a
//                   href={student.tenthMarks}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500">
//                   View
//                 </a>
//               </td>
//               <td className="py-2 px-4 border-b">
//                 <a
//                   href={student.twelfthMarks}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500">
//                   View
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   ) : (
//     <>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">USN</th>
//               <th className="py-2 px-4 border-b">Semester</th>
//               <th className="py-2 px-4 border-b">Section</th>
//               <th className="py-2 px-4 border-b">Branch</th>
//               <th className="py-2 px-4 border-b">Aadhar Number</th>
//               <th className="py-2 px-4 border-b">Address</th>
//               <th className="py-2 px-4 border-b">Email</th>
//               <th className="py-2 px-4 border-b">10th Marks</th>
//               <th className="py-2 px-4 border-b">12th Marks</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <p className="text-gray-500">No students found</p>
//     </>
//   );
// };

function StudentTable({ filteredData }) {
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
                  <td className="py-2 px-4 border-b">{student.aadharNumber}</td>
                  <td className="py-2 px-4 border-b">{student.address}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={student.tenthMarks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500">
                      View
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={student.twelfthMarks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p className="text-gray-500">No students found</p>
          )}
        </table>
      </div>
    </>
  );
}
