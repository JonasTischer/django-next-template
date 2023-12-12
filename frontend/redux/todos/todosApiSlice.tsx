import { Todo } from '@/typings';
import { apiSlice } from '../services/apiSlice';


const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveToDos: builder.query<Todo, void>({
      query: () => 'todos/',
    }),
    createToDo: builder.mutation({
      query: ({ title, completed }: Todo) => ({
        url: 'todos/',
        method: 'POST',
        body: { title, completed },
      }),
    }),
  }),
});

export const {
  useRetrieveToDosQuery,
  useCreateToDoMutation,
} = authApiSlice;
