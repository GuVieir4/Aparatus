function Footer() {
  return (
    <footer className="text-muted-foreground bg-muted border-border mt-8 w-full border-t p-4 text-center text-xs">
      &copy; {new Date().getFullYear()} Aparatus. Todos os direitos reservados.
    </footer>
  );
}

export default Footer;
