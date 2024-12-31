import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Bell, Mail, MessageSquare, Zap } from 'lucide-react';
import { Switch } from '../ui/Switch';

export const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    updatesNotifications: true,
    securityAlerts: true
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Notifications</h3>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-white">Notifications par email</p>
              </div>
              <p className="text-sm text-gray-400">
                Recevoir des mises à jour importantes par email
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={() => handleSettingChange('emailNotifications')}
            />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-400" />
                <p className="text-white">Notifications push</p>
              </div>
              <p className="text-sm text-gray-400">
                Recevoir des notifications sur votre appareil
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={() => handleSettingChange('pushNotifications')}
            />
          </div>

          {/* Marketing Emails */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <p className="text-white">Emails marketing</p>
              </div>
              <p className="text-sm text-gray-400">
                Recevoir des offres et actualités
              </p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={() => handleSettingChange('marketingEmails')}
            />
          </div>

          {/* Updates */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gray-400" />
                <p className="text-white">Mises à jour produit</p>
              </div>
              <p className="text-sm text-gray-400">
                Être informé des nouvelles fonctionnalités
              </p>
            </div>
            <Switch
              checked={settings.updatesNotifications}
              onCheckedChange={() => handleSettingChange('updatesNotifications')}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings; 