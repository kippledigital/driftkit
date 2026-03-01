"use client";

import React from "react";
import { CodeBlock } from "./client";

interface UsageProps {
  componentName: string;
}

// Component-specific usage data
const usageData: Record<string, any> = {
  button: {
    variants: [
      {
        title: "Variants",
        description: "Four distinct visual styles for different contexts.",
        examples: [
          {
            title: "Default",
            code: `<Button variant="default">Default Button</Button>`,
            description: "Primary action button with high emphasis"
          },
          {
            title: "Secondary", 
            code: `<Button variant="secondary">Secondary Button</Button>`,
            description: "Alternative action with medium emphasis"
          },
          {
            title: "Ghost",
            code: `<Button variant="ghost">Ghost Button</Button>`,
            description: "Subtle button for low emphasis actions"
          },
          {
            title: "Destructive",
            code: `<Button variant="destructive">Delete Item</Button>`,
            description: "For dangerous or irreversible actions"
          }
        ]
      },
      {
        title: "Sizes",
        description: "Three sizes to match your content hierarchy.",
        examples: [
          {
            title: "Small",
            code: `<Button size="sm">Small</Button>`,
            description: "Compact button for tight spaces"
          },
          {
            title: "Medium", 
            code: `<Button size="md">Medium</Button>`,
            description: "Default size for most use cases"
          },
          {
            title: "Large",
            code: `<Button size="lg">Large</Button>`,
            description: "Prominent button for primary actions"
          }
        ]
      },
      {
        title: "States",
        description: "Loading and success states with built-in animations.",
        examples: [
          {
            title: "Loading",
            code: `<Button loading={true}>Submit</Button>`,
            description: "Shows spinner and 'Loading...' text"
          },
          {
            title: "Success",
            code: `<Button success={true}>Submit</Button>`,
            description: "Shows checkmark and 'Done' text"
          },
          {
            title: "Disabled",
            code: `<Button disabled>Cannot Click</Button>`,
            description: "Inactive state with reduced opacity"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "Button Group",
        code: `<div className="flex gap-2">
  <Button variant="default">Save</Button>
  <Button variant="secondary">Cancel</Button>
</div>`,
        description: "Group related actions together"
      },
      {
        title: "Icon Button",
        code: `<Button variant="ghost" size="sm">
  <Icon name="settings" />
  Settings
</Button>`,
        description: "Combine with icons for better context"
      },
      {
        title: "Async Form Submit",
        code: `function SubmitForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    await submitData();
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };
  
  return (
    <Button 
      loading={loading} 
      success={success}
      onClick={handleSubmit}
    >
      Submit Form
    </Button>
  );
}`,
        description: "Handle async operations with visual feedback"
      }
    ],
    props: [
      {
        name: "variant",
        type: "'default' | 'secondary' | 'ghost' | 'destructive'",
        required: false,
        default: "'default'",
        description: "Visual style variant of the button"
      },
      {
        name: "size", 
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: "'md'",
        description: "Size of the button"
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        default: "false",
        description: "Shows loading spinner and changes text to 'Loading...'"
      },
      {
        name: "success",
        type: "boolean", 
        required: false,
        default: "false",
        description: "Shows checkmark and changes text to 'Done'"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        default: "—",
        description: "Button content (text, icons, etc.)"
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables the button and reduces opacity"
      }
    ]
  },
  
  card: {
    variants: [
      {
        title: "Variants",
        description: "Three visual styles for different design needs.",
        examples: [
          {
            title: "Default",
            code: `<Card variant="default">
  <CardContent title="Default Card" description="Standard card with border" />
</Card>`,
            description: "Standard card with subtle border and background"
          },
          {
            title: "Outlined",
            code: `<Card variant="outlined">
  <CardContent title="Outlined Card" description="Transparent background with border" />
</Card>`,
            description: "Transparent background with prominent border"
          },
          {
            title: "Elevated",
            code: `<Card variant="elevated">
  <CardContent title="Elevated Card" description="Pre-elevated with shadow" />
</Card>`,
            description: "Always elevated with shadow, no hover effect"
          }
        ]
      },
      {
        title: "Sizes",
        description: "Text sizing that scales content appropriately.",
        examples: [
          {
            title: "Small",
            code: `<Card size="sm">
  <CardContent title="Small Card" description="Compact text sizing" />
</Card>`,
            description: "Compact sizing for dense layouts"
          },
          {
            title: "Medium",
            code: `<Card size="md">
  <CardContent title="Medium Card" description="Default text sizing" />
</Card>`,
            description: "Standard size for most use cases"
          },
          {
            title: "Large", 
            code: `<Card size="lg">
  <CardContent title="Large Card" description="Larger text for emphasis" />
</Card>`,
            description: "Large sizing for featured content"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "Full Card Structure",
        code: `<Card>
  <CardImage src="/image.jpg" alt="Card image" />
  <CardContent 
    title="Card Title"
    description="A brief description of the card content goes here."
  >
    <p>Additional content can be added here.</p>
  </CardContent>
  <CardActions>
    <Button variant="default">Primary</Button>
    <Button variant="secondary">Secondary</Button>
  </CardActions>
</Card>`,
        description: "Complete card with image, content, and actions"
      },
      {
        title: "Card Grid",
        code: `<CardGrid columns={3} gap="md">
  <Card animated>
    <CardContent title="Card 1" description="First card" />
  </Card>
  <Card animated>
    <CardContent title="Card 2" description="Second card" />
  </Card>
  <Card animated>
    <CardContent title="Card 3" description="Third card" />
  </Card>
</CardGrid>`,
        description: "Responsive grid with staggered entrance animations"
      },
      {
        title: "Interactive Card",
        code: `<Card onClick={() => navigate('/details')} className="cursor-pointer">
  <CardContent 
    title="Clickable Card"
    description="This card can be clicked to navigate or trigger actions"
  />
</Card>`,
        description: "Card that responds to clicks with hover animations"
      }
    ],
    props: [
      {
        name: "variant",
        type: "'default' | 'outlined' | 'elevated'",
        required: false,
        default: "'default'",
        description: "Visual style variant of the card"
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false, 
        default: "'md'",
        description: "Text size scaling for card content"
      },
      {
        name: "static",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables hover and press animations"
      },
      {
        name: "animated",
        type: "boolean",
        required: false,
        default: "false",
        description: "Enables entrance animation (use with CardGrid)"
      },
      {
        name: "delay",
        type: "number",
        required: false,
        default: "0",
        description: "Animation delay for staggered entrances"
      },
      {
        name: "children",
        type: "ReactNode", 
        required: true,
        default: "—",
        description: "Card content (CardContent, CardImage, etc.)"
      }
    ]
  },

  input: {
    variants: [
      {
        title: "States",
        description: "Visual feedback for different input states.",
        examples: [
          {
            title: "Default",
            code: `<Input label="Username" placeholder="Enter username" />`,
            description: "Standard input state"
          },
          {
            title: "Error",
            code: `<Input 
  label="Email" 
  state="error" 
  errorMessage="Please enter a valid email"
  value="invalid-email"
/>`,
            description: "Error state with validation message"
          },
          {
            title: "Success",
            code: `<Input 
  label="Password" 
  state="success" 
  value="SecurePassword123"
/>`,
            description: "Success state with checkmark"
          }
        ]
      },
      {
        title: "Sizes",
        description: "Three sizes to match your design scale.",
        examples: [
          {
            title: "Small",
            code: `<Input size="sm" label="Small Input" />`,
            description: "Compact input for tight spaces"
          },
          {
            title: "Medium",
            code: `<Input size="md" label="Medium Input" />`,
            description: "Default size for most forms"
          },
          {
            title: "Large", 
            code: `<Input size="lg" label="Large Input" />`,
            description: "Prominent input for important fields"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "Form with Validation",
        code: `function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  return (
    <form className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        state={errors.email ? 'error' : 'default'}
        errorMessage={errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        state={errors.password ? 'error' : 'default'}
        errorMessage={errors.password}
      />
      <Button type="submit">Sign In</Button>
    </form>
  );
}`,
        description: "Complete form with state management and validation"
      },
      {
        title: "Search Input",
        code: `<div className="relative">
  <Input
    label="Search"
    placeholder="Search components..."
    className="pl-10"
  />
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
</div>`,
        description: "Input with icon for search functionality"
      }
    ],
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        default: "—",
        description: "Floating label text"
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: "'md'",
        description: "Size of the input field"
      },
      {
        name: "state",
        type: "'default' | 'error' | 'success'",
        required: false,
        default: "'default'",
        description: "Visual state of the input"
      },
      {
        name: "errorMessage",
        type: "string",
        required: false,
        default: "—",
        description: "Error message shown in error state"
      }
    ]
  },

  dialog: {
    variants: [
      {
        title: "Sizes",
        description: "Three sizes to match your content needs.",
        examples: [
          {
            title: "Small",
            code: `<Dialog open={isOpen} onClose={() => setIsOpen(false)} size="sm">
  <DialogTitle>Small Dialog</DialogTitle>
  <DialogDescription>This is a compact dialog for simple confirmations.</DialogDescription>
  <DialogFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={() => setIsOpen(false)}>Confirm</Button>
  </DialogFooter>
</Dialog>`,
            description: "Compact dialog for simple confirmations"
          },
          {
            title: "Medium",
            code: `<Dialog open={isOpen} onClose={() => setIsOpen(false)} size="md">
  <DialogTitle>Medium Dialog</DialogTitle>
  <DialogDescription>This is the default size, good for most content.</DialogDescription>
  <DialogFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={() => setIsOpen(false)}>Confirm</Button>
  </DialogFooter>
</Dialog>`,
            description: "Default size for most dialog content"
          },
          {
            title: "Large",
            code: `<Dialog open={isOpen} onClose={() => setIsOpen(false)} size="lg">
  <DialogTitle>Large Dialog</DialogTitle>
  <DialogDescription>Spacious dialog for complex forms or detailed content.</DialogDescription>
  <DialogFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={() => setIsOpen(false)}>Save</Button>
  </DialogFooter>
</Dialog>`,
            description: "Large dialog for complex content"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "Confirmation Dialog",
        code: `function DeleteConfirmation({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onClose={onClose} size="sm">
      <DialogTitle>Delete Item</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this item? This action cannot be undone.
      </DialogDescription>
      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={() => {
          onConfirm();
          onClose();
        }}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}`,
        description: "Confirmation dialog with destructive action"
      },
      {
        title: "Form Dialog", 
        code: `function EditUserDialog({ user, isOpen, onClose, onSave }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  return (
    <Dialog open={isOpen} onClose={onClose} size="md">
      <DialogTitle>Edit User</DialogTitle>
      <DialogDescription>
        Update the user's information below.
      </DialogDescription>
      
      <div className="space-y-4 my-6">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave({ name, email })}>Save Changes</Button>
      </DialogFooter>
    </Dialog>
  );
}`,
        description: "Form dialog with input validation"
      }
    ],
    props: [
      {
        name: "open",
        type: "boolean",
        required: true,
        default: "—",
        description: "Whether the dialog is open"
      },
      {
        name: "onClose",
        type: "() => void",
        required: true,
        default: "—",
        description: "Called when dialog should close"
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: "'md'",
        description: "Size of the dialog"
      },
      {
        name: "title",
        type: "string",
        required: false,
        default: "—",
        description: "Accessible title for screen readers"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        default: "—",
        description: "Dialog content"
      }
    ]
  },

  tabs: {
    variants: [
      {
        title: "Basic Usage",
        description: "Simple tab interface with content switching.",
        examples: [
          {
            title: "Controlled",
            code: `function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  const tabs = [
    { value: 'tab1', label: 'Overview', content: <div>Overview content</div> },
    { value: 'tab2', label: 'Details', content: <div>Details content</div> },
    { value: 'tab3', label: 'Settings', content: <div>Settings content</div> }
  ];
  
  return (
    <Tabs 
      items={tabs}
      value={activeTab}
      onValueChange={setActiveTab}
    />
  );
}`,
            description: "Controlled tabs with state management"
          },
          {
            title: "Uncontrolled",
            code: `const tabs = [
  { value: 'home', label: 'Home', content: <HomePage /> },
  { value: 'about', label: 'About', content: <AboutPage /> },
  { value: 'contact', label: 'Contact', content: <ContactPage /> }
];

<Tabs items={tabs} defaultValue="home" />`,
            description: "Uncontrolled tabs with default selection"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "Dashboard Tabs",
        code: `function Dashboard() {
  const tabs = [
    {
      value: 'analytics',
      label: (
        <div className="flex items-center gap-2">
          <BarChartIcon className="w-4 h-4" />
          Analytics
        </div>
      ),
      content: <AnalyticsView />
    },
    {
      value: 'users',
      label: (
        <div className="flex items-center gap-2">
          <UsersIcon className="w-4 h-4" />
          Users
          <Badge variant="info">24</Badge>
        </div>
      ),
      content: <UsersView />
    },
    {
      value: 'settings',
      label: 'Settings',
      content: <SettingsView />
    }
  ];
  
  return <Tabs items={tabs} defaultValue="analytics" />;
}`,
        description: "Rich tab labels with icons and badges"
      },
      {
        title: "Lazy Loading Tabs",
        code: `function LazyTabs() {
  const [loadedTabs, setLoadedTabs] = useState(new Set(['overview']));
  
  const handleTabChange = (value) => {
    setLoadedTabs(prev => new Set([...prev, value]));
  };
  
  const tabs = [
    { value: 'overview', label: 'Overview', content: <Overview /> },
    { 
      value: 'data', 
      label: 'Data', 
      content: loadedTabs.has('data') ? <DataTable /> : <div>Loading...</div>
    },
    { 
      value: 'reports', 
      label: 'Reports', 
      content: loadedTabs.has('reports') ? <Reports /> : <div>Loading...</div>
    }
  ];
  
  return <Tabs items={tabs} onValueChange={handleTabChange} />;
}`,
        description: "Performance optimization with lazy loading"
      }
    ],
    props: [
      {
        name: "items",
        type: "TabItem[]",
        required: true,
        default: "—",
        description: "Array of tab definitions with value, label, and content"
      },
      {
        name: "value",
        type: "string",
        required: false,
        default: "—",
        description: "Controlled active tab value"
      },
      {
        name: "defaultValue",
        type: "string",
        required: false,
        default: "items[0].value",
        description: "Default active tab (uncontrolled mode)"
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        required: false,
        default: "—",
        description: "Called when active tab changes"
      }
    ]
  },

  badge: {
    variants: [
      {
        title: "Variants",
        description: "Different visual styles for various contexts.",
        examples: [
          {
            title: "Default",
            code: `<Badge variant="default">Default</Badge>`,
            description: "Standard neutral badge"
          },
          {
            title: "Success",
            code: `<Badge variant="success">Active</Badge>`,
            description: "Positive status or confirmation"
          },
          {
            title: "Warning",
            code: `<Badge variant="warning">Pending</Badge>`,
            description: "Caution or attention needed"
          },
          {
            title: "Error",
            code: `<Badge variant="error">Failed</Badge>`,
            description: "Error or critical status"
          },
          {
            title: "Info",
            code: `<Badge variant="info">New</Badge>`,
            description: "Informational or neutral status"
          },
          {
            title: "Outline",
            code: `<Badge variant="outline">Draft</Badge>`,
            description: "Subtle outline-only style"
          }
        ]
      },
      {
        title: "Sizes",
        description: "Three sizes for different use cases.",
        examples: [
          {
            title: "Small",
            code: `<Badge size="sm">Small</Badge>`,
            description: "Compact badge for tight spaces"
          },
          {
            title: "Medium",
            code: `<Badge size="md">Medium</Badge>`,
            description: "Default size for most use cases"
          },
          {
            title: "Large",
            code: `<Badge size="lg">Large</Badge>`,
            description: "Prominent badge for emphasis"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "Status Indicators",
        code: `function UserStatus({ user }) {
  const getStatusBadge = (status) => {
    const variants = {
      online: { variant: 'success', text: 'Online' },
      away: { variant: 'warning', text: 'Away' },
      offline: { variant: 'default', text: 'Offline' },
      busy: { variant: 'error', text: 'Busy' }
    };
    
    const config = variants[status] || variants.offline;
    return <Badge variant={config.variant} pulse={status === 'online'}>{config.text}</Badge>;
  };
  
  return (
    <div className="flex items-center gap-2">
      <img src={user.avatar} className="w-8 h-8 rounded-full" />
      <span>{user.name}</span>
      {getStatusBadge(user.status)}
    </div>
  );
}`,
        description: "Dynamic status badges with pulse animation"
      },
      {
        title: "Removable Tags",
        code: `function TagList({ tags, onRemove }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Badge 
          key={tag.id}
          variant="secondary"
          removable
          onRemove={() => onRemove(tag.id)}
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}`,
        description: "Tag system with removal functionality"
      },
      {
        title: "Notification Counts",
        code: `function NotificationBell({ count }) {
  return (
    <div className="relative">
      <Button variant="ghost" size="sm">
        <BellIcon className="w-5 h-5" />
      </Button>
      {count > 0 && (
        <Badge 
          variant="error" 
          size="sm"
          className="absolute -top-1 -right-1 min-w-[18px] rounded-full"
        >
          {count > 99 ? '99+' : count}
        </Badge>
      )}
    </div>
  );
}`,
        description: "Notification badges with count display"
      }
    ],
    props: [
      {
        name: "variant",
        type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline'",
        required: false,
        default: "'default'",
        description: "Visual style variant"
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        default: "'md'",
        description: "Size of the badge"
      },
      {
        name: "pulse",
        type: "boolean",
        required: false,
        default: "false",
        description: "Whether to show pulse animation"
      },
      {
        name: "removable",
        type: "boolean",
        required: false,
        default: "false",
        description: "Whether badge can be removed"
      },
      {
        name: "onRemove",
        type: "() => void",
        required: false,
        default: "—",
        description: "Called when badge is removed"
      },
      {
        name: "icon",
        type: "ReactNode",
        required: false,
        default: "—",
        description: "Icon to display in badge"
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        default: "—",
        description: "Badge content"
      }
    ]
  },

  accordion: {
    variants: [
      {
        title: "Basic Usage",
        description: "Collapsible content sections.",
        examples: [
          {
            title: "Single Item",
            code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is DriftKit?</AccordionTrigger>
    <AccordionContent>
      DriftKit is a collection of motion-first React components built with Framer Motion.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
            description: "Single collapsible accordion item"
          },
          {
            title: "Multiple Items",
            code: `<Accordion type="multiple">
  <AccordionItem value="features">
    <AccordionTrigger>Features</AccordionTrigger>
    <AccordionContent>
      Spring-based animations, TypeScript support, and accessible by default.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="installation">
    <AccordionTrigger>Installation</AccordionTrigger>
    <AccordionContent>
      Install via npm: npm install driftkit
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
            description: "Multiple items can be open simultaneously"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "FAQ Section",
        code: `function FAQ() {
  const faqs = [
    {
      question: "How do I install DriftKit?",
      answer: "You can install DriftKit via npm with: npm install driftkit"
    },
    {
      question: "Is TypeScript supported?",
      answer: "Yes, DriftKit is built with TypeScript and includes full type definitions."
    },
    {
      question: "Can I customize the animations?",
      answer: "Absolutely! All components accept custom Framer Motion props to override animations."
    }
  ];
  
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={\`item-\${index}\`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}`,
        description: "Frequently asked questions with accordion"
      }
    ],
    props: [
      {
        name: "type",
        type: "'single' | 'multiple'",
        required: true,
        default: "—",
        description: "Whether single or multiple items can be open"
      },
      {
        name: "collapsible",
        type: "boolean",
        required: false,
        default: "false",
        description: "Whether items can be collapsed (single type only)"
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        required: false,
        default: "—",
        description: "Default open items"
      },
      {
        name: "value",
        type: "string | string[]",
        required: false,
        default: "—",
        description: "Controlled open items"
      }
    ]
  },

  toast: {
    variants: [
      {
        title: "Variants",
        description: "Different notification types with appropriate styling.",
        examples: [
          {
            title: "Default",
            code: `toast("Your changes have been saved.")`,
            description: "Standard informational message"
          },
          {
            title: "Success",
            code: `toast.success("Profile updated successfully!")`,
            description: "Positive confirmation message"
          },
          {
            title: "Error",
            code: `toast.error("Failed to save changes. Please try again.")`,
            description: "Error notification"
          },
          {
            title: "Warning",
            code: `toast.warning("This action cannot be undone.")`,
            description: "Caution or warning message"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "Toast with Actions",
        code: `function UndoableDelete() {
  const handleDelete = (item) => {
    // Delete the item
    deleteItem(item.id);
    
    // Show toast with undo action
    toast.success("Item deleted", {
      action: {
        label: "Undo",
        onClick: () => restoreItem(item)
      }
    });
  };
  
  return (
    <Button variant="destructive" onClick={() => handleDelete(item)}>
      Delete Item
    </Button>
  );
}`,
        description: "Toast notifications with action buttons"
      },
      {
        title: "Loading Toast",
        code: `function AsyncOperation() {
  const handleSubmit = async () => {
    const toastId = toast.loading("Saving changes...");
    
    try {
      await saveData();
      toast.success("Changes saved!", { id: toastId });
    } catch (error) {
      toast.error("Failed to save changes", { id: toastId });
    }
  };
  
  return <Button onClick={handleSubmit}>Save</Button>;
}`,
        description: "Dynamic toast updates for async operations"
      }
    ],
    props: [
      {
        name: "title",
        type: "string",
        required: false,
        default: "—",
        description: "Toast title"
      },
      {
        name: "description",
        type: "string",
        required: false,
        default: "—",
        description: "Toast description/message"
      },
      {
        name: "action",
        type: "{ label: string; onClick: () => void }",
        required: false,
        default: "—",
        description: "Optional action button"
      },
      {
        name: "duration",
        type: "number",
        required: false,
        default: "4000",
        description: "Auto-dismiss duration in milliseconds"
      }
    ]
  },

  tooltip: {
    variants: [
      {
        title: "Positions",
        description: "Tooltip can be positioned around the trigger element.",
        examples: [
          {
            title: "Top",
            code: `<Tooltip content="This tooltip appears above" side="top">
  <Button>Hover me</Button>
</Tooltip>`,
            description: "Tooltip positioned above the trigger"
          },
          {
            title: "Bottom", 
            code: `<Tooltip content="This tooltip appears below" side="bottom">
  <Button>Hover me</Button>
</Tooltip>`,
            description: "Tooltip positioned below the trigger"
          },
          {
            title: "Left",
            code: `<Tooltip content="This tooltip appears to the left" side="left">
  <Button>Hover me</Button>
</Tooltip>`,
            description: "Tooltip positioned to the left"
          },
          {
            title: "Right",
            code: `<Tooltip content="This tooltip appears to the right" side="right">
  <Button>Hover me</Button>
</Tooltip>`,
            description: "Tooltip positioned to the right"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "Icon with Tooltip",
        code: `function HelpIcon({ content }) {
  return (
    <Tooltip content={content} side="top">
      <button className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
        <QuestionMarkIcon className="w-3 h-3" />
      </button>
    </Tooltip>
  );
}

// Usage
<HelpIcon content="This field is required for account verification" />`,
        description: "Help icon with contextual tooltip"
      },
      {
        title: "Rich Tooltip Content",
        code: `function UserTooltip({ user }) {
  return (
    <Tooltip 
      content={
        <div className="p-2">
          <div className="font-semibold">{user.name}</div>
          <div className="text-sm text-neutral-400">{user.role}</div>
          <div className="text-xs mt-1">Last seen: {user.lastSeen}</div>
        </div>
      }
      side="top"
    >
      <img src={user.avatar} className="w-8 h-8 rounded-full cursor-pointer" />
    </Tooltip>
  );
}`,
        description: "Rich tooltip with custom content"
      }
    ],
    props: [
      {
        name: "content",
        type: "ReactNode",
        required: true,
        default: "—",
        description: "Tooltip content"
      },
      {
        name: "side",
        type: "'top' | 'bottom' | 'left' | 'right'",
        required: false,
        default: "'top'",
        description: "Preferred side to show tooltip"
      },
      {
        name: "align",
        type: "'start' | 'center' | 'end'",
        required: false,
        default: "'center'",
        description: "Alignment of tooltip relative to trigger"
      },
      {
        name: "delayDuration",
        type: "number",
        required: false,
        default: "700",
        description: "Delay before showing tooltip (ms)"
      }
    ]
  },

  dropdown: {
    variants: [
      {
        title: "Basic Usage",
        description: "Dropdown menu with various content types.",
        examples: [
          {
            title: "Simple Menu",
            code: `<Dropdown>
  <DropdownTrigger>
    <Button variant="secondary">Options</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Copy</DropdownItem>
    <DropdownSeparator />
    <DropdownItem destructive>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>`,
            description: "Simple dropdown with text items"
          },
          {
            title: "With Icons",
            code: `<Dropdown>
  <DropdownTrigger>
    <Button variant="ghost">
      <MoreHorizontalIcon className="w-4 h-4" />
    </Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>
      <EditIcon className="w-4 h-4 mr-2" />
      Edit
    </DropdownItem>
    <DropdownItem>
      <CopyIcon className="w-4 h-4 mr-2" />
      Duplicate
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem destructive>
      <TrashIcon className="w-4 h-4 mr-2" />
      Delete
    </DropdownItem>
  </DropdownContent>
</Dropdown>`,
            description: "Dropdown with icons and labels"
          }
        ]
      }
    ],
    compositions: [
      {
        title: "User Menu",
        code: `function UserMenu({ user, onSignOut }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
          <img src={user.avatar} className="w-8 h-8 rounded-full" />
          <div className="text-sm">
            <div className="font-medium">{user.name}</div>
            <div className="text-neutral-500 dark:text-neutral-300">{user.email}</div>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownLabel>My Account</DropdownLabel>
        <DropdownSeparator />
        <DropdownItem>
          <UserIcon className="w-4 h-4 mr-2" />
          Profile
        </DropdownItem>
        <DropdownItem>
          <SettingsIcon className="w-4 h-4 mr-2" />
          Settings
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onClick={onSignOut}>
          <LogOutIcon className="w-4 h-4 mr-2" />
          Sign out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}`,
        description: "Complete user menu with profile info"
      }
    ],
    props: [
      {
        name: "open",
        type: "boolean",
        required: false,
        default: "—",
        description: "Controlled open state"
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: false,
        default: "—",
        description: "Called when open state changes"
      }
    ]
  }
};

export default function Usage({ componentName }: UsageProps) {
  const data = usageData[componentName];
  
  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500 dark:text-neutral-300">
          Usage examples coming soon for {componentName}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Variants Section */}
      {data.variants && (
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-6">
            Variants & States
          </h2>
          <div className="space-y-8">
            {data.variants.map((section: any, index: number) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  {section.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  {section.description}
                </p>
                <div className="grid gap-6">
                  {section.examples.map((example: any, exIndex: number) => (
                    <div key={exIndex} className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                          {example.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {example.description}
                        </p>
                      </div>
                      <div className="p-4">
                        <CodeBlock code={example.code} language="tsx" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compositions Section */}
      {data.compositions && (
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-6">
            Composition Examples
          </h2>
          <div className="space-y-6">
            {data.compositions.map((example: any, index: number) => (
              <div key={index} className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                  <h3 className="font-medium text-neutral-900 dark:text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {example.description}
                  </p>
                </div>
                <div className="p-4">
                  <CodeBlock code={example.code} language="tsx" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Props Table */}
      {data.props && (
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-6">
            Props Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left py-3 pr-6 font-medium text-neutral-900 dark:text-white">Name</th>
                  <th className="text-left py-3 pr-6 font-medium text-neutral-900 dark:text-white">Type</th>
                  <th className="text-left py-3 pr-6 font-medium text-neutral-900 dark:text-white">Required</th>
                  <th className="text-left py-3 pr-6 font-medium text-neutral-900 dark:text-white">Default</th>
                  <th className="text-left py-3 font-medium text-neutral-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                {data.props.map((prop: any) => (
                  <tr key={prop.name} className="border-b border-neutral-100 dark:border-neutral-900">
                    <td className="py-3 pr-6">
                      <code className="text-sm bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-900 dark:text-neutral-100">
                        {prop.name}
                      </code>
                    </td>
                    <td className="py-3 pr-6">
                      <code className="text-sm text-neutral-600 dark:text-neutral-400 break-words">
                        {prop.type}
                      </code>
                    </td>
                    <td className="py-3 pr-6">
                      <span className={`text-sm ${prop.required ? 'text-red-600 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-300 dark:text-neutral-500 dark:text-neutral-300'}`}>
                        {prop.required ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 pr-6">
                      <code className="text-sm text-neutral-600 dark:text-neutral-400">
                        {prop.default}
                      </code>
                    </td>
                    <td className="py-3 text-sm text-neutral-600 dark:text-neutral-400">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}