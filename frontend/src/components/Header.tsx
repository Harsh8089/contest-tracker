const Header = ({
  title,
  subTitle
}: {
  title: string,
  subTitle: string
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        { title }
      </h1>
      <h3 className="text-muted-foreground">
        { subTitle }
      </h3>
    </>
  );
}

export default Header;