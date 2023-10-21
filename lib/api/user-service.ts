import axios from 'axios';

import { User } from '@prisma/client';
import { QueryFunctionContext } from '@tanstack/react-query';

const getUsers = (ctx: QueryFunctionContext) =>
  axios.get<User[]>('/api/users', { signal: ctx.signal }).then(res => res.data);

const userService = {
  getUsers,
};

export default userService;
