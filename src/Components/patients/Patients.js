import React from "react";
import "./patients.css";
import { DataQuery } from "@dhis2/app-runtime";

const trackedEntityTypeId = "";
const orgUnitId = "DiszpKrYNg8";

const query = {
  patientsInProgram: {
    resource: "trackedEntityInstances",
    params: {
      fields: "trackedEntityInstance,attributes[attribute,displayName,value]",
      ou: orgUnitId,
      trackedEntityType: trackedEntityTypeId,
    },
  },
};

const Patients = () => {
  return (
    <div className="patients-cont">
      <h1 className="title">Patients</h1>
      <DataQuery query={query}>
        {({ error, loading, data }) => {
          if (error) {
            return <span>ERROR: {error.message}</span>;
          }
          if (loading) {
            return <span>Loading...</span>;
          }

          const patientsInProgram =
            data.patientsInProgram?.trackedEntityInstances || []; // Ensure it's an array

          if (!Array.isArray(patientsInProgram)) {
            return <span>Patients data is not in the expected format.</span>;
          }

          // Extract all unique attribute names
          const allAttributes = patientsInProgram.reduce((attributes, patient) => {
            patient.attributes.forEach((attribute) => {
                if (!attributes.includes(attribute.displayName)) {
                    attributes.push(attribute.displayName);
                  }
                });
                return attributes;
              }, []);
    
              console.log(data);
    
              return (
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      {allAttributes.map((attributeName) => (
                        <th key={attributeName}>{attributeName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {patientsInProgram.map((patient) => (
                      <tr key={patient.trackedEntityInstance}>
                        <td>{patient.trackedEntityInstance}</td>
                        {allAttributes.map((attributeName) => {
                          const matchingAttribute = patient.attributes.find(
                            (attribute) => attribute.displayName === attributeName
                          );
                          return (
                            <td key={attributeName}>
                              {matchingAttribute ? matchingAttribute.value : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            }}
          </DataQuery>
        </div>
      );
    };
    
    export default Patients;
    