import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';

export function Legal() {
  return (
    <Box maxW="800px" m="auto" p="4">
      <Heading mb="4">Privacy Policy for WishSanangerDananger</Heading>

      <Text>Last updated: 02.12.2023</Text>

      <Text mt="4">1. Introduction</Text>
      <Text>Welcome to WishSanangerDananger. This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information. By using our password manager services, you agree to the terms outlined in this Privacy Policy.</Text>

      <Text mt="4">2. Information We Collect</Text>
      <Text>2.1 Account Information</Text>
      <Text>
        When you create an account, we collect the following information:
        <ul>
          <li>
            Username

          </li>
          <li>
            Encrypted Passwords

          </li>
        </ul>
        <br />
        <br />
      </Text>
      <br />

      <Text>2.2 Usage Information</Text>
      <Text>
        We may collect information about how you use our password manager service. We only collect your Password and Account Data
      </Text>
      <br />

      <Text mt="4">3. How We Use Your Information</Text>
      <Text>3.1 Account Management</Text>
      <Text>We use the information collected to manage your account, including user authentication password storage.</Text>
      <br />

      <Text>3.2 Service Improvement</Text>
      <Text>We may analyze usage patterns to enhance and improve our password manager services, ensuring a better user experience.</Text>
      <br />

      <Text mt="4">4. Data Security</Text>
      <Text>4.1 Encryption</Text>
      <Text>All passwords stored with us are encrypted using industry-standard encryption algorithms to ensure the security of your data.</Text>
      <br />
      <Text>4.2 Hashing</Text>
      <Text>Your master password is completley hashed so we arent able to know what it is and due to security.</Text>
      <br />

      <Text>
        Access to your personal information is restricted to authorized personnel only. We implement access controls and regularly review our security measures to protect your data.
      </Text>
      <br />

      <Text mt="4">5. Third-Party Disclosures</Text>
      <Text>5.1 No Selling of Personal Information</Text>
      <Text>We do not sell, trade, or otherwise transfer your personal information to third parties for marketing or other purposes.</Text>
      <br />

      <Text>5.2 Legal Compliance</Text>
      <Text>We may disclose your information if required by law or in response to valid requests from government authorities.</Text>
      <br />

      <Text mt="4">6. Your Choices</Text>
      <Text>6.1 Account Deletion</Text>
      <Text>You may request the deletion of your account and associated data by contacting us at <Link href="mailto:bischof.david.db@gmail.com">bischof.david.db@gmail.com</Link>.</Text>
      <br />

      <Text mt="4">7. Updates to Privacy Policy</Text>
      <Text>We may update this Privacy Policy from time to time. Any changes will be reflected on this page, and the date of the latest revision will be updated accordingly.</Text>
      <br />

      <Text mt="4">8. Contact Us</Text>
      <Text>If you have any questions or concerns about our Privacy Policy, please contact us at <Link href="mailto:bischof.david.db@gmail.com">bischof.david.db@gmail.com</Link>.</Text>
      <br />

      <Text mt="4">By using WishSanangerDananger, you agree to the terms outlined in this Privacy Policy.</Text>

      <Text mt="4">Thank you for choosing Us!</Text>
    </Box>
  );
}

