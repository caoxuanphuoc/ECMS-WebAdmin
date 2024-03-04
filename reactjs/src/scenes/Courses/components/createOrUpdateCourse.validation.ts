import { L } from '../../../lib/abpUtility';

const rules = {
  courseCode: [{ required: true, message: L('This Field Is Required') }],
  courseName: [{ required: true, message: L('This Field Is Required') }],
  courseFee: [{ required: true, message: L('This Field Is Required') }],
  quantity: [{ required: true, message: L('This Field Is Required') }],
};
export default rules;
