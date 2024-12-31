import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export const ProfileDropdown = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter",
        variant: "error"
      });
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
        <span>{user?.email}</span>
        <ChevronDown className="w-4 h-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-gray-900 border border-gray-800 shadow-lg">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${
                    active ? 'bg-gray-800' : ''
                  } flex items-center gap-2 px-4 py-2 text-sm text-gray-300 rounded-md`}
                >
                  <User className="w-4 h-4" />
                  Profil
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/settings"
                  className={`${
                    active ? 'bg-gray-800' : ''
                  } flex items-center gap-2 px-4 py-2 text-sm text-gray-300 rounded-md`}
                >
                  <Settings className="w-4 h-4" />
                  Paramètres
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-gray-800' : ''
                  } flex items-center gap-2 px-4 py-2 text-sm text-gray-300 rounded-md w-full`}
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}; 