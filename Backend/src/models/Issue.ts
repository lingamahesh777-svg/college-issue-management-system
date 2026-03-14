import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    phoneNo: { type: String, required: true },

    issuePlace: {
      type: String,
      required: true,
    },
    issue: { type: String },
    address: { type: String },
    
    description: { type: String, required: true },

    image: { type: String },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
      default: "OPEN",
    },


    solverName: {
  type: String,
},

solverPhone: {
  type: String,
},


    
    // ⭐ Time-Oriented Module
    statusHistory: [
      {
        status: {
          type: String,
          enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    resolvedAt: {
      type: Date,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
