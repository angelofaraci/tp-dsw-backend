import { prop, getModelForClass } from "@typegoose/typegoose";

class Company {
  @prop({ type: String }) id!: string;
  @prop({ type: String }) name!: string;
  @prop({ type: String }) website?: string;
  @prop({ type: String }) email?: string;
  @prop({ type: [String] }) socials?: string[];
}

const CompanyModel = getModelForClass(Company, {
  schemaOptions: {
    timestamps: true,
  },
});

export { CompanyModel, Company };
