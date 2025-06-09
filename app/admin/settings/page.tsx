"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Shield,
  Database,
  Key,
  DatabaseIcon,
  Save,
  LogOut,
  ExternalLink,
  Lock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    siteName: "Itahar Government Polytechnic",
    siteEmail: "info@itahargpoly.com",
    adminEmail: "admin@itahargpoly.com",
    maintenanceMode: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Settings updated:", formData);
    setIsLoading(false);
  };

  const handleLogout = () => {
    // // Clear all relevant localStorage items (you can be specific if needed)
    // localStorage.removeItem("token"); // or any specific key you're using
    // localStorage.removeItem("user"); // example, adjust based on your storage keys

    // Optionally, clear all of localStorage
    localStorage.clear();

    // Optionally, clear sessionStorage or cookies if used
    // sessionStorage.clear();
    // document.cookie = "your_cookie_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page
    redirect("/login");
  };

  const tabs = [
    { id: "general", name: "General", icon: Settings },
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Access Control", icon: Shield },
    { id: "backup", name: "Backup", icon: Database },
    { id: "auth", name: "Authentication", icon: Key },
    { id: "database", name: "Database", icon: DatabaseIcon },
  ];

  const firebaseLinks = {
    auth: "https://console.firebase.google.com/",
    database: "https://console.firebase.google.com/",
    security: "https://console.firebase.google.com/",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your admin panel and website configuration
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="lg:w-72">
          <nav className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Settings Menu
            </h3>
            <ul className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Settings Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <div className="bg-white rounded-xl shadow-sm border">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    General Settings
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Configure basic website settings
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="siteName"
                          value={formData.siteName}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Site name cannot be changed
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="siteEmail"
                          value={formData.siteEmail}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Site email cannot be changed
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Maintenance Mode
                        </h3>
                        <p className="text-sm text-gray-600">
                          Enable to show maintenance page to visitors
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="maintenanceMode"
                          checked={formData.maintenanceMode}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {formData.maintenanceMode && (
                      <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-orange-800">
                          Maintenance mode is enabled. Visitors will see a
                          maintenance page.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Profile Settings
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Manage your admin profile and account
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      name="adminEmail"
                      value={formData.adminEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="pt-6 border-t">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      You will be redirected to the login page
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Access Control */}
            {activeTab === "security" && (
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Access Control
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Manage user permissions and access rights
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-medium text-blue-900 mb-2">
                        Manage Access Control from Firebase
                      </h3>
                      <p className="text-blue-800 mb-4">
                        Configure user roles, permissions, and access control
                        settings directly from your Firebase console.
                      </p>
                      <a
                        href={firebaseLinks.security}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Open Firebase Console
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Backup Settings */}
            {activeTab === "backup" && (
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Backup Settings
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Your data backup configuration
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-green-900 mb-2">
                        Automatic Backup Enabled
                      </h3>
                      <p className="text-green-800 mb-4">
                        All your data is being backed up automatically by
                        Firebase. Your database, authentication data, and
                        storage files are continuously protected with Firebase's
                        built-in backup and recovery systems.
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Backup Features:
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Real-time data replication</li>
                          <li>• Point-in-time recovery</li>
                          <li>• Multi-region redundancy</li>
                          <li>• Automatic failover protection</li>
                        </ul>
                      </div>
                      <p className="text-sm text-green-700 mt-3">
                        No additional configuration required. Your data is safe
                        and secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Authentication */}
            {activeTab === "auth" && (
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Authentication
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Manage authentication settings and providers
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Key className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-medium text-blue-900 mb-2">
                        Manage Authentication from Firebase
                      </h3>
                      <p className="text-blue-800 mb-4">
                        Configure authentication providers, user management, and
                        security settings directly from your Firebase
                        Authentication console.
                      </p>
                      <a
                        href={firebaseLinks.auth}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Open Firebase Authentication
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Database */}
            {activeTab === "database" && (
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Database Management
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Manage your Firestore database
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <DatabaseIcon className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-medium text-blue-900 mb-2">
                        Manage Database from Firebase
                      </h3>
                      <p className="text-blue-800 mb-4">
                        Access your Firestore database, manage collections,
                        documents, and configure security rules directly from
                        the Firebase console.
                      </p>
                      <a
                        href={firebaseLinks.database}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Open Firestore Database
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
