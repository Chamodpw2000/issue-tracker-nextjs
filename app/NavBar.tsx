'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Container, DropdownMenu } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();
    const { data: session, status } = useSession();
    
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ];

    return (
        <nav className='border-b my-5 px-5 h-14 bg-white'>
            <Container>
                <div className='flex items-center justify-between h-full'>
                    {/* Left section: Logo and Links */}
                    <div className='flex items-center space-x-6'>
                        <Link href="/" className='text-2xl text-blue-600'>
                            <AiFillBug />
                        </Link>
                        <ul className='flex space-x-6'>
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        className={classNames({
                                            'text-zinc-900': currentPath === link.href,
                                            'text-zinc-500': currentPath !== link.href,
                                            'hover:text-zinc-800 transition-colors': true,
                                        })}
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Right section: Auth controls */}
                    <div>
                        {status === 'authenticated' && session.user && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar
                                        src={session.user.image || undefined}
                                        fallback={session.user.name?.charAt(0) || "?"}
                                        size="2"
                                        radius="full"
                                        className="cursor-pointer"
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content sideOffset={5}>
                                    <DropdownMenu.Label>
                                        {session.user.email || session.user.name}
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item>
                                        <Link href="/api/auth/signout">Logout</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                        
                        {status === 'unauthenticated' && (
                            <Link
                                href="/api/auth/signin"
                                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
                            >
                                Sign In
                            </Link>
                        )}
                        
                        {status === 'loading' && (
                            <span className='text-gray-500'>Loading...</span>
                        )}
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default NavBar;
