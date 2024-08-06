export default function Page({ params }: { params: { subdomain: string } }) {
  return <div>Subdomain: {params.subdomain}</div>;
}
