import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import Hero from '../../components/smallHero';

export async function getServerSideProps(context) {
  const req = context.req;
  const session = await getServerSession(context.req, context.res, authOptions);
  var [categoriesRes, servicesRes, employeesRes, usersRes] = await Promise.all([
    fetch(`${process.env.APP_DOMAIN}/api/orders/categoryList`),
    fetch(`${process.env.APP_DOMAIN}/api/orders/serviceList`),
    fetch(`${process.env.APP_DOMAIN}/api/orders/employeeList`),
    fetch(`${process.env.APP_DOMAIN}/api/user/userList`),
  ]);
  var [categories, services, employees, users] = await Promise.all([
    await categoriesRes.json(),
    await servicesRes.json(),
    await employeesRes.json(),
    await usersRes.json(),
  ]);
  return {
    props: {
      users,
      categories,
      services,
      employees,
    },
  };
}

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function User(second) {
  return (
    <>
      <section>
        <Hero header={props.users.FirstName + ' ' + props.users.LastName} link=" Главная / Профиль" />
      </section>
    </>
  );
}
