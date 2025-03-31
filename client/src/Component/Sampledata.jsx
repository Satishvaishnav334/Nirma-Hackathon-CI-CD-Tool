import React, { useState, useEffect } from "react";

const sampleReport = {
  tests: [
    { name: "Login Test", status: "passed", duration: 1200 },
    { name: "Search Functionality", status: "failed", duration: 900 },
    { name: "Checkout Flow", status: "passed", duration: 1500 }
  ]
};

const PlaywrightReport = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    // Simulate fetching report data
    setReport(sampleReport.tests);
  }, []);

  return (
    <div className="p-10 shadow-lg border m-5 rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Playwright Test Report</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Test Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Duration (ms)</th>
          </tr>
        </thead>
        <tbody>
          {report.map((test, index) => (
            <tr key={index} className={test.status === "passed" ? "text-black-500" : "text-red-500"}>
              <td className="border p-2">{test.name}</td>
              <td className="border p-2">{test.status}</td>
              <td className="border p-2">{test.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaywrightReport;
