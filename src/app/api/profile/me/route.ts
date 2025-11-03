export async function GET() {
  return Response.json(
    {
      id: '123123123',
      email: 'test@mail.ru',
      userName: 'username',
      name: 'John Doe',
      avatarUrl: '',
      emailConfirmed: false,
      createdAt: '2025-11-01T00:00:00Z',
    },
  );
}
