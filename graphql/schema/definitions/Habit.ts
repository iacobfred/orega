import Definition, { OPTIONAL_STRING, REQUIRED_STRING } from "@/graphql/schema/definition";

const definition: Definition = {
  name: "habit",
  fields: {
    userId: { required: true, type: "ID" },
    name: REQUIRED_STRING,
    public: { required: false, type: "Boolean", default: false },
    chronString: OPTIONAL_STRING,
    defaultDurationInMinutes: { required: false, type: "Int" },
    // archivedAt: { required: false, type: "DateTime" },
  },
};

export default definition;
