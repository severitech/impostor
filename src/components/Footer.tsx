function Footer() {
  const url = import.meta.env.VITE_URL || 'https://github.com/severitech';

  return (
    <footer className="w-full text-center flex-none py-4 bg-gray-900 text-gray-400 border-t border-gray-800">
      Desarrollado con amor por{' '}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline hover:text-blue-400 transition-colors cursor-pointer"
      >
        Severitech
      </a>
    </footer>
  );
}

export default Footer;
