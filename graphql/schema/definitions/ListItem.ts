import Definition from "@/graphql/schema/definition"; // OPTIONAL_STRING, // REQUIRED_STRING,

const definition: Definition = {
  name: "listItem",
  fields: {
    userId: { required: true, type: "ID", typeCast: "ObjectId" },
    listId: { required: true, type: "ID", typeCast: "ObjectId" },
    data: { required: true, type: "Map", typeCast: "JSON" },
    // archivedAt: { required: false, type: "DateTime", typeCast: "DateTime" },
  },
};

export default definition;
