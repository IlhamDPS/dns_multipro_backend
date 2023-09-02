import * as crypto from "crypto";
import {User} from "../models/users";
import {generateToken} from "../middleware/jwt";
import {ApplicationError} from '../helper/error_handler';
import { v4 } from 'uuid';
import axios from 'axios';

export const getJobList = async (description, location, full_time, page) => {
    try {
        const apiUrl = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';
    
        const response = await axios.get(apiUrl, {
          params: { description, location, full_time, page },
        });
    
        return  response.data;
      } catch (error) {
        throw new ApplicationError({
            message: `Url can't be hit`,
            type: 'InternalError',
            detail: error
        });
      }
}

export const getJobDetail = async (id) => {
  try {
      const apiUrl =`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`;
  
      const response = await axios.get(apiUrl);
  
      return  response.data;
    } catch (error) {
      throw new ApplicationError({
          message: `Id Not Found`,
          type: 'InternalError',
          detail: error
      });
    }
}
