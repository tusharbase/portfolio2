import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              © {currentYear}{' '}
              <Link 
                href="#home" 
                scroll={true}
                prefetch={false}
                className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              >
                tushar.base.eth
              </Link>
            </p>
          </div>
      </div>
    </footer>
  )
}
