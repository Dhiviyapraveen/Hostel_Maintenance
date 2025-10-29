const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          Inhouse Project – Department of CSE © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
