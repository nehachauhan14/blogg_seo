import Link from 'next/link';

import Layout from '../components/Layout';

const Index = ()  => {
    return <Layout>
        <h2>Hello World!</h2>
        <Link href="/signup">Signup</Link>
        <Link href="/signin">Signin</Link>
    </Layout>
}
  
export default Index
  