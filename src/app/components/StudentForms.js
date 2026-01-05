"use client";

const Table = ({ headers, data, column }) => {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          {headers.map((val, index) => (
            <th key={index}>{val}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((val, index) => (
          <tr key={index}>
            {column.map((key, i) => (
              <td key={i}>{val[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const StudentForm = ({ users }) => {
  return (
    <div>
      <h3>Student Data</h3>
      <Table 
        headers={["Name", "Password", "Gender", "Country"]}
        data={users}
        column={["name", "pwd", "gender", "country"]}
      />
    </div>
  );
};

export default StudentForm;   