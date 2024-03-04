import Company from '../../models/company.js';
import { GraphQLError } from "graphql";

const  Query = {
    getAllCompanies: async () => {
      return await Company.find();
    },
  }

const  Mutation = {
    registerCompany: async (_, {  companyInput: { nit, name, address, phone } }) => {      

      if (!nit || !name || !address || !phone) {
        throw new GraphQLError("Faltan campos por llenar.", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const company = await Company.findOne({nit});

      if(company){
        throw new GraphQLError("Company already exists.", {
          extensions: {
            code: "BAD_REQUEST",
          },
        });
      }

      const newCompany = new Company({nit, name, address, phone});
      return await newCompany.save();
    },
    updateCompany: async (_, { id, companyInput }) => {
      return await Company.findByIdAndUpdate(id, companyInput, { new: true });
    },
    deleteCompany: async (_, { id }) => {
      await Company.findByIdAndDelete(id);
      return 'Empresa eliminada correctamente';
    },
}

export { Query, Mutation }
