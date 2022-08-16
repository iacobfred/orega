import CalendarModel from "@/graphql/generated/models/calendar.model";
import NotebookModel from "@/graphql/generated/models/notebook.model";
import Definition, {
  OPTIONAL_BOOLEAN,
  OPTIONAL_STRING,
  REQUIRED_STRING,
} from "@/graphql/schema/definition";
import { DocumentType } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

const COST_FACTOR = 12;

const definition: Definition = {
  name: "user",
  modelImports: [
    "Account",
    "Calendar",
    "CalendarEvent",
    "Goal",
    "Habit",
    "Mantra",
    "Notebook",
    "Task",
  ],
  fields: {
    name: OPTIONAL_STRING,
    email: { ...REQUIRED_STRING, unique: true },
    emailVerified: OPTIONAL_BOOLEAN,
    image: OPTIONAL_STRING,
    isAdmin: { required: true, default: false, type: "Boolean" },
    settings: {
      required: true,
      default: {},
      type: "Map",
      shape: {
        colorMode: { type: "String", required: false, choices: ["light", "dark"] },
        defaultCalendarId: { type: "ID", required: false },
      },
    },
    lastLogin: { required: false, type: "DateTime" },
    password: { required: false, select: false, type: "String" },
    // archivedAt: { required: false, type: "DateTime" },
    accounts: {
      required: false,
      default: [],
      type: "Array",
      typeArg: "Account",
      typeCast: "[Account]",
    },
    calendars: {
      required: false,
      default: [],
      type: "Array",
      typeArg: "Calendar",
      typeCast: "[Calendar]",
    },
    calendarEvents: {
      required: false,
      default: [],
      type: "Array",
      typeArg: "CalendarEvent",
      typeCast: "[CalendarEvent]",
    },
    goals: { required: false, default: [], type: "Array", typeArg: "Goal", typeCast: "[Goal]" },
    habits: { required: false, default: [], type: "Array", typeArg: "Habit", typeCast: "[Habit]" },
    mantras: {
      required: false,
      default: [],
      type: "Array",
      typeArg: "Mantra",
      typeCast: "[Mantra]",
    },
    notebooks: {
      required: false,
      default: [],
      type: "Array",
      typeArg: "Notebook",
      typeCast: "[Notebook]",
    },
    tasks: { required: false, default: [], type: "Array", typeArg: "Task", typeCast: "[Task]" },
  },
  hooks: {
    save: {
      pre: async function (next) {
        const instance = this as DocumentType<any>;
        if (instance.isModified("password") && instance.password) {
          instance.password = await bcrypt.hash(instance.password, COST_FACTOR);
        }
        return next();
      },
      post: async (user: any) => {
        let saveChanges = false;
        if (!user.calendars?.length) {
          const defaultCalendar = await CalendarModel.create({
            userId: user.id,
            name: "Default calendar",
          });
          user.calendars = [defaultCalendar];
          user.markModified("calendars");
          user.settings.defaultCalendarId = defaultCalendar.id;
          user.markModified("settings");
          saveChanges = true;
        }
        if (!user.notebooks?.length) {
          const defaultNotebook = await NotebookModel.create({
            userId: user.id,
            title: "Journal",
          });
          user.notebooks = [defaultNotebook];
          user.markModified("notebooks");
          saveChanges = true;
        }
        saveChanges && user.save();
      },
    },
  },
};

export default definition;

// @TypeGraphQL.Field(() => [Account], { nullable: false })
// @Property({ required: true, default: [] })
// accounts!: Account[];

// @TypeGraphQL.Field(() => [Calendar], { nullable: false })
// @Property({ required: true, default: [] })
// calendars!: Calendar[];

// @TypeGraphQL.Field(() => [Identity], { nullable: false })
// @Property({ required: true, default: [] })
// identities!: Identity[];

// @TypeGraphQL.Field(() => [Value], { nullable: false })
// @Property({ required: true, default: [] })
// values!: Value[];

// @TypeGraphQL.Field(() => [Belief], { nullable: false })
// @Property({ required: true, default: [] })
// beliefs!: Belief[];

// @TypeGraphQL.Field(() => [Mantra], { nullable: false })
// @Property({ required: true, default: [] })
// mantras!: Mantra[];

// @TypeGraphQL.Field(() => [Habit], { nullable: false })
// @Property({ required: true, default: [] })
// habits!: Habit[];

// @TypeGraphQL.Field(() => [Task], { nullable: true })
// @Property({ required: false, default: [] })
// tasks!: Task[];

// @TypeGraphQL.Field(() => [Dashboard], { nullable: true })
// @Property({ required: false, default: [] })
// dashboards!: Dashboard[];

// @TypeGraphQL.Field(() => [Notebook], { nullable: true })
// @Property({ required: false, default: [] })
// notebooks!: Notebook[];

// notebookPermissions?: NotebookUserPermission[];

// @TypeGraphQL.Field(() => [List], { nullable: true })
// @Property({ required: false, default: [] })
// lists?: List[];

// readings?: Reading[];

// bookshelves?: Bookshelf[];

// bookReviews?: BookReview[];
