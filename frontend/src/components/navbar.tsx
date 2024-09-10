import Link from 'next/link';

const Navbar = () => {
    return (
        <div
            className={
                'z-50 bg-white dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6 border-bottom shadow justify-between'
            }
        >
            <div className="font-bold text-xl text-black">Blockhouse</div>
            <div className="text-lg text-black">
                Built by{' '}
                <Link
                    className="text-blue-700 hover:underline font-semibold"
                    href={'https://github.com/olivemonk'}
                >
                    olivemonk
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
