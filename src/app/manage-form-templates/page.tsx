'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText, Plus, Edit2, CheckCircle2, XCircle,
  ChevronDown, ChevronRight, Layers, AlertCircle, Trash2
} from 'lucide-react';
import Swal from 'sweetalert2';

interface Plan {
  _id: string;
  planId: string;
  title: string;
  isActive: boolean;
}

interface PlanGroup {
  _id: string;
  groupId: string;
  title: string;
  isActive: boolean;
  sortOrder: number;
  plans: Plan[];
}

interface TemplateStatus {
  planId: string;
  exists: boolean;
  version: number;
  fieldCount: number;
  sectionCount: number;
  updatedAt: string;
}

// Fetches template existence status for a given planId
async function fetchTemplateStatus(planId: string): Promise<TemplateStatus | null> {
  try {
    const res = await fetch(`/api/life-journey-report/form-templates/${planId}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!data.success || !data.template) return { planId, exists: false, version: 0, fieldCount: 0, sectionCount: 0, updatedAt: '' };

    const t = data.template;
    const fieldCount = (t.sections || []).reduce(
      (sum: number, s: any) => sum + (s.fields?.length || 0), 0
    ) + (t.addons || []).reduce(
      (sum: number, a: any) => sum + (a.additionalFields?.length || 0), 0
    );

    return {
      planId,
      exists: true,
      version: t.version,
      fieldCount,
      sectionCount: t.sections?.length || 0,
      updatedAt: t.updatedAt,
    };
  } catch {
    return null;
  }
}

const TemplateBadge = ({ status }: { status: TemplateStatus | null | undefined }) => {
  if (!status) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
        <span className="w-3 h-3 border border-gray-300 rounded-full border-dashed inline-block" />
        Checking...
      </span>
    );
  }
  if (!status.exists) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
        <AlertCircle className="w-3 h-3" />
        No template
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
      <CheckCircle2 className="w-3 h-3" />
      v{status.version} · {status.fieldCount} fields
    </span>
  );
};

const PlanRow = ({
  plan,
  status,
  onEdit,
  onDelete,
}: {
  plan: Plan;
  status: TemplateStatus | null | undefined;
  onEdit: (planId: string) => void;
  onDelete: (planId: string) => void;
}) => (
  <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-all group">
    <div className="flex items-center gap-3 min-w-0">
      <FileText className="w-4 h-4 text-gray-300 flex-shrink-0" />
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            {plan.planId}
          </span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${plan.isActive
            ? 'text-green-700 bg-green-100'
            : 'text-red-600 bg-red-100'
            }`}>
            {plan.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-0.5 truncate">{plan.title}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
      <TemplateBadge status={status} />

      {status?.exists ? (
        <button
          onClick={() => onEdit(plan.planId)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
        >
          <Edit2 className="w-3 h-3" />
          Edit template
        </button>
      ) : (
        <button
          onClick={() => onEdit(plan.planId)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all"
        >
          <Plus className="w-3 h-3" />
          Create template
        </button>
      )}

      {status?.exists && (
        <button
          onClick={() => onDelete(plan.planId)}
          className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          title="Delete template"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  </div>
);

const GroupSection = ({
  group,
  templateStatuses,
  onEditTemplate,
  onDeleteTemplate,
}: {
  group: PlanGroup;
  templateStatuses: Record<string, TemplateStatus | null>;
  onEditTemplate: (planId: string) => void;
  onDeleteTemplate: (planId: string) => void;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const filledCount = group.plans.filter(p => templateStatuses[p.planId]?.exists).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-all text-left"
      >
        <div className="flex items-center gap-3">
          {collapsed
            ? <ChevronRight className="w-4 h-4 text-gray-400" />
            : <ChevronDown className="w-4 h-4 text-gray-400" />
          }
          <Layers className="w-4 h-4 text-red-500" />
          <span className="font-semibold text-gray-800">{group.title}</span>
          <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
            {group.groupId}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {filledCount}/{group.plans.length} templates
          </span>
          {filledCount === group.plans.length && group.plans.length > 0 ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-amber-400" />
          )}
        </div>
      </button>

      {!collapsed && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {group.plans.length === 0 ? (
            <p className="text-sm text-gray-400 px-5 py-4">No plans in this group.</p>
          ) : (
            group.plans.map(plan => (
              <PlanRow
                key={plan.planId}
                plan={plan}
                status={templateStatuses[plan.planId]}
                onEdit={onEditTemplate}
                onDelete={onDeleteTemplate}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const FormTemplateList = () => {
  const router = useRouter();
  const [groups, setGroups] = useState<PlanGroup[]>([]);
  const [ungroupedPlans, setUngroupedPlans] = useState<Plan[]>([]);
  const [templateStatuses, setTemplateStatuses] = useState<Record<string, TemplateStatus | null>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [plansRes, groupsRes] = await Promise.all([
        fetch('/api/admin/plans', { credentials: 'include' }),
        fetch('/api/admin/plan-groups', { credentials: 'include' }),
      ]);
      const plansData = await plansRes.json();
      const groupsData = await groupsRes.json();

      const allPlans: Plan[] = plansData.success ? plansData.plans : [];
      const allGroups: PlanGroup[] = groupsData.success ? groupsData.groups : [];

      setGroups(allGroups.sort((a, b) => a.sortOrder - b.sortOrder));

      const groupedIds = new Set(allGroups.flatMap(g => g.plans.map(p => p.planId)));
      setUngroupedPlans(allPlans.filter(p => !groupedIds.has(p.planId)));

      // Fetch template statuses in parallel
      const allPlanIds = allPlans.map(p => p.planId);
      const statuses = await Promise.all(allPlanIds.map(id => fetchTemplateStatus(id)));
      const statusMap: Record<string, TemplateStatus | null> = {};
      allPlanIds.forEach((id, i) => { statusMap[id] = statuses[i]; });
      setTemplateStatuses(statusMap);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTemplate = async (planId: string) => {
    const result = await Swal.fire({
      title: 'Delete template?',
      text: `The form template for "${planId}" will be soft-deleted. The plan itself is not affected.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Delete template',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/life-journey-report/form-templates/${planId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setTemplateStatuses(prev => ({
          ...prev,
          [planId]: { planId, exists: false, version: 0, fieldCount: 0, sectionCount: 0, updatedAt: '' },
        }));
        Swal.fire('Deleted', 'Template removed.', 'success');
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to delete template.', 'error');
    }
  };

  const handleEditTemplate = (planId: string) => {
    router.push(`/manage-form-templates/${planId}`);
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
      </div>
    );
  }

  const totalTemplates = Object.values(templateStatuses).filter(s => s?.exists).length;
  const totalPlans = Object.keys(templateStatuses).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Form Templates</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the form fields shown to users for each report plan
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">{totalTemplates}<span className="text-gray-400 font-normal text-lg">/{totalPlans}</span></p>
            <p className="text-xs text-gray-500">templates configured</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Coverage</span>
          <span className="text-sm text-gray-500">{totalPlans > 0 ? Math.round((totalTemplates / totalPlans) * 100) : 0}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${totalPlans > 0 ? (totalTemplates / totalPlans) * 100 : 0}%` }}
          />
        </div>
        {totalTemplates < totalPlans && (
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {totalPlans - totalTemplates} plan{totalPlans - totalTemplates !== 1 ? 's' : ''} missing a form template — mobile app will fall back to defaults
          </p>
        )}
      </div>

      {/* Groups */}
      {groups.map(group => (
        <GroupSection
          key={group.groupId}
          group={group}
          templateStatuses={templateStatuses}
          onEditTemplate={handleEditTemplate}
          onDeleteTemplate={handleDeleteTemplate}
        />
      ))}

      {/* Ungrouped plans */}
      {ungroupedPlans.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
          <div className="px-5 py-4 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Ungrouped plans</span>
          </div>
          <div className="divide-y divide-gray-50">
            {ungroupedPlans.map(plan => (
              <PlanRow
                key={plan.planId}
                plan={plan}
                status={templateStatuses[plan.planId]}
                onEdit={handleEditTemplate}
                onDelete={handleDeleteTemplate}
              />
            ))}
          </div>
        </div>
      )}

      {groups.length === 0 && ungroupedPlans.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FileText className="w-10 h-10 mx-auto mb-3 text-gray-200" />
          <p className="font-medium">No plans found</p>
          <p className="text-sm mt-1">Create plans first, then configure their form templates here</p>
        </div>
      )}
    </div>
  );
};

export default FormTemplateList;