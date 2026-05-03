from __future__ import annotations

import enum
from typing import Any, overload

from sqlalchemy import Enum as SaEnum  # noqa: TID251


class Enum(
    SaEnum
):  # Same as sqlalchemy.Enum except it sets a default values_callable to get enum values instead of keys
    @overload
    def __init__(self, enums: type[enum.Enum], **kw: Any) -> None: ...

    @overload
    def __init__(self, *enums: str, **kw: Any) -> None: ...

    def __init__(self, *enums: str | type[enum.Enum], **kw: Any) -> None:
        r"""Construct an enum

        Keyword arguments which don't apply to a specific backend are ignored
        by that backend.

        :param \*enums: either exactly one PEP-435 compliant enumerated type
           or one or more string labels.

        :param create_constraint: defaults to False.  When creating a
           non-native enumerated type, also build a CHECK constraint on the
           database against the valid values.

           .. note:: it is strongly recommended that the CHECK constraint
              have an explicit name in order to support schema-management
              concerns.  This can be established either by setting the
              :paramref:`.Enum.name` parameter or by setting up an
              appropriate naming convention; see
              :ref:`constraint_naming_conventions` for background.

           .. versionchanged:: 1.4 - this flag now defaults to False, meaning
              no CHECK constraint is generated for a non-native enumerated
              type.

        :param metadata: Associate this type directly with a ``MetaData``
           object. For types that exist on the target database as an
           independent schema construct (PostgreSQL), this type will be
           created and dropped within ``create_all()`` and ``drop_all()``
           operations. If the type is not associated with any ``MetaData``
           object, it will associate itself with each ``Table`` in which it is
           used, and will be created when any of those individual tables are
           created, after a check is performed for its existence. The type is
           only dropped when ``drop_all()`` is called for that ``Table``
           object's metadata, however.

           The value of the :paramref:`_schema.MetaData.schema` parameter of
           the :class:`_schema.MetaData` object, if set, will be used as the
           default value of the :paramref:`_types.Enum.schema` on this object
           if an explicit value is not otherwise supplied.

           .. versionchanged:: 1.4.12 :class:`_types.Enum` inherits the
              :paramref:`_schema.MetaData.schema` parameter of the
              :class:`_schema.MetaData` object if present, when passed using
              the :paramref:`_types.Enum.metadata` parameter.

        :param name: The name of this type. This is required for PostgreSQL
           and any future supported database which requires an explicitly
           named type, or an explicitly named constraint in order to generate
           the type and/or a table that uses it. If a PEP-435 enumerated
           class was used, its name (converted to lower case) is used by
           default.

        :param native_enum: Use the database's native ENUM type when
           available. Defaults to True. When False, uses VARCHAR + check
           constraint for all backends. When False, the VARCHAR length can be
           controlled with :paramref:`.Enum.length`; currently "length" is
           ignored if native_enum=True.

        :param length: Allows specifying a custom length for the VARCHAR
           when a non-native enumeration datatype is used.  By default it uses
           the length of the longest value.

           .. versionchanged:: 2.0.0 The :paramref:`.Enum.length` parameter
              is used unconditionally for ``VARCHAR`` rendering regardless of
              the :paramref:`.Enum.native_enum` parameter, for those backends
              where ``VARCHAR`` is used for enumerated datatypes.


        :param schema: Schema name of this type. For types that exist on the
           target database as an independent schema construct (PostgreSQL),
           this parameter specifies the named schema in which the type is
           present.

           If not present, the schema name will be taken from the
           :class:`_schema.MetaData` collection if passed as
           :paramref:`_types.Enum.metadata`, for a :class:`_schema.MetaData`
           that includes the :paramref:`_schema.MetaData.schema` parameter.

           .. versionchanged:: 1.4.12 :class:`_types.Enum` inherits the
              :paramref:`_schema.MetaData.schema` parameter of the
              :class:`_schema.MetaData` object if present, when passed using
              the :paramref:`_types.Enum.metadata` parameter.

           Otherwise, if the :paramref:`_types.Enum.inherit_schema` flag is set
           to ``True``, the schema will be inherited from the associated
           :class:`_schema.Table` object if any; when
           :paramref:`_types.Enum.inherit_schema` is at its default of
           ``False``, the owning table's schema is **not** used.


        :param quote: Set explicit quoting preferences for the type's name.

        :param inherit_schema: When ``True``, the "schema" from the owning
           :class:`_schema.Table`
           will be copied to the "schema" attribute of this
           :class:`.Enum`, replacing whatever value was passed for the
           ``schema`` attribute.   This also takes effect when using the
           :meth:`_schema.Table.to_metadata` operation.

        :param validate_strings: when True, string values that are being
           passed to the database in a SQL statement will be checked
           for validity against the list of enumerated values.  Unrecognized
           values will result in a ``LookupError`` being raised.

        :param values_callable: A callable which will be passed the PEP-435
           compliant enumerated type, which should then return a list of string
           values to be persisted. This allows for alternate usages such as
           using the string value of an enum to be persisted to the database
           instead of its name. The callable must return the values to be
           persisted in the same order as iterating through the Enum's
           ``__member__`` attribute. For example
           ``lambda x: [i.value for i in x]``.

           .. versionadded:: 1.2.3

        :param sort_key_function: a Python callable which may be used as the
           "key" argument in the Python ``sorted()`` built-in.   The SQLAlchemy
           ORM requires that primary key columns which are mapped must
           be sortable in some way.  When using an unsortable enumeration
           object such as a Python 3 ``Enum`` object, this parameter may be
           used to set a default sort key function for the objects.  By
           default, the database value of the enumeration is used as the
           sorting function.

           .. versionadded:: 1.3.8

        :param omit_aliases: A boolean that when true will remove aliases from
           pep 435 enums. defaults to ``True``.

           .. versionchanged:: 2.0 This parameter now defaults to True.

        """

        kw["values_callable"] = kw.get("values_callable", lambda obj: [e.value for e in obj])
        super().__init__(*enums, **kw)  # type: ignore[arg-type]
